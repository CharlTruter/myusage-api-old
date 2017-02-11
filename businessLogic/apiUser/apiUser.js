'use strict';

const ApiUserRepo = require('../../repositories/mysql/apiUsers.js');
const ConfigRepo = require('../../repositories/configuration/configurationRepository.js');
const ApiUserValidation = require('./apiUserValidation.js');
const EncryptionHelper = require('../encryption/encryptionHelper.js');
const AwsClient = require('../../repositories/aws/awsClient.js');
const ApiGatewayRepo = require('../../repositories/aws/apiGatewayRepository.js');
const ApiKeyFactory = require('../../factories/aws/apiKeyFactory.js');

module.exports = function CreateApiUser(sequelize, awsPackage) {
  const _this = this;
  this.apiUserRepo = new ApiUserRepo(sequelize);
  this.configRepo = new ConfigRepo();
  this.apiUserValidation = new ApiUserValidation();
  this.encryptionHelper = new EncryptionHelper();
  const awsClient = new AwsClient(awsPackage);
  this.apiGatewayRepo = new ApiGatewayRepo(awsClient);
  this.apiKeyFactory = new ApiKeyFactory();

  this.CreateApiUser = {
    create: function create(event, callback) {
      let methodEvent = event;

      if (!methodEvent) {
        methodEvent = {};
      }

      return _this.apiUserValidation.validateCreate(methodEvent,
        function validateCreateCallback(validateError) {
          try {
            if (validateError) {
              return callback(validateError);
            }

            return _this.CreateApiUser.createUserInDatabase(event,
              function createCallback(createError, apiUser) {
                if (createError) {
                  return callback(createError);
                }

                return _this.CreateApiUser.createApiKey(apiUser,
                  function createApiCallback(createApiError, apiKey) {
                    if (createApiError) {
                      return callback(createApiError);
                    }

                    return _this.CreateApiUser.addApiKeyToUsagePlan(apiKey,
                      function usagePlanCallback(usagePlanError) {
                        if (usagePlanError) {
                          return callback(usagePlanError);
                        }

                        return _this.CreateApiUser.updateUserApiKey(apiUser.id, apiKey,
                          function updateCallback(updateError, updatedUser) {
                            if (updateError) {
                              return callback(updateError);
                            }

                            return callback(null, updatedUser);
                          });
                      });
                  });
              });
          } catch (error) {
            return callback(error);
          }
        });
    },
    createUserInDatabase: function createUserInDatabase(event, callback) {
      const bodyJson = event['body-json'];

      const createArgs = {};

      if (bodyJson.firstName) {
        createArgs.firstName = bodyJson.firstName;
      }

      if (bodyJson.lastName) {
        createArgs.lastName = bodyJson.lastName;
      }

      if (bodyJson.emailAddress) {
        createArgs.emailAddress = bodyJson.emailAddress;
      }

      if (bodyJson.enabled !== undefined && bodyJson.enabled !== null) {
        createArgs.enabled = bodyJson.enabled === true || bodyJson.enabled === 'true';
      }

      return this.getPasswordFromJsonBody(bodyJson, function getCallback(getError, passwordHash) {
        if (getError) {
          return callback(getError);
        }

        if (passwordHash) {
          createArgs.password = passwordHash;
        }

        return _this.apiUserRepo.create(createArgs, function createCallback(error, user) {
          if (error) {
            return callback(error);
          }

          return callback(null, user);
        });
      });
    },
    getPasswordFromJsonBody: function getPasswordFromJsonBody(bodyJson, callback) {
      if (bodyJson.password) {
        return _this.encryptionHelper.encryptValue(bodyJson.password, null,
          function encryptCallback(encryptError, passwordHash) {
            if (encryptError) {
              return callback(encryptError);
            }

            return callback(null, passwordHash);
          });
      }

      return callback();
    },
    createApiKey: function createApiKey(user, callback) {
      if (!user) {
        throw Error('No user information specified.');
      }
      const createApiKeyArgs = {
        name: this.getApiKeyName(user.emailAddress),
        description: this.getApiKeyDescription(user.emailAddress),
        enabled: user.enabled,
      };

      return _this.apiGatewayRepo.createApiKey(createApiKeyArgs,
        function createApiKeyCallback(createError, apiKey) {
          if (createError) {
            return callback(createError);
          }

          return callback(null, _this.apiKeyFactory.parseResult(apiKey));
        });
    },
    addApiKeyToUsagePlan: function addApiKeyToUsagePlan(apiKey, callback) {
      const usagePlanId = _this.configRepo.getAwsUsagePlanId();

      return _this.apiGatewayRepo.addApiKeyToUsagePlan(apiKey, usagePlanId,
        function addApiKeyCallback(addError) {
          if (addError) {
            return callback(addError);
          }

          return callback();
        });
    },
    updateUserApiKey: function updateUserApiKey(apiUserId, apiKey, callback) {
      try {
        if (!apiUserId) {
          throw new Error('No api user id specified.');
        } else if (!apiKey) {
          throw new Error('No api key specified.');
        }

        return _this.encryptionHelper.encryptValue(apiKey, null,
          function encryptCallback(encryptError, apiKeyHash) {
            const updateArgs = {
              apiKey: apiKeyHash,
            };

            return _this.apiUserRepo.update(apiUserId, updateArgs,
              function updateCallback(updateError, updatedUser) {
                if (updateError) {
                  return callback(updateError);
                }

                return callback(null, updatedUser);
              });
          });
      } catch (error) {
        return callback(error);
      }
    },
    getApiKeyName: function getApiKeyName(email) {
      if (!email) {
        throw new Error('No email specified.');
      }

      return `${_this.configRepo.getAwsApiKeyNamePrefix()}_${email}`;
    },
    getApiKeyDescription: function getApiKeyDescription(email) {
      if (!email) {
        throw new Error('No email specified.');
      }

      return `Api key for user ${email}`;
    },
  };

  this.GetApiUser = {
    getByApiKey: function getByApiKey(apiKey, callback) {
      if (!apiKey) {
        return callback();
      }

      return _this.encryptionHelper.encryptValue(apiKey, null,
        function encryptCallback(encryptError, encryptedApiKey) {
          if (encryptError) {
            return callback(encryptError);
          }

          return _this.apiUserRepo.getOneByApiKey(encryptedApiKey,
            function getCallback(getError, apiUser) {
              if (getError) {
                return callback(getError);
              } else if (!apiUser) {
                return callback();
              }

              return callback(null, apiUser);
            });
        });
    },
  };
};
