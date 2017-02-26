'use strict';

const ApiKeyFactory = require('../../factories/aws/apiKeyFactory.js');

module.exports = function apiGatewayRepository(awsClient) {
  const _this = this;
  this.awsClient = awsClient;
  this.apiGateway = new this.awsClient.aws.APIGateway();
  this.apiKeyFactory = new ApiKeyFactory();

  this.createApiKey = function createApiKey(args, callback) {
    try {
      let methodArgs = args;
      if (!methodArgs) {
        methodArgs = {};
      }

      const params = {};

      if (methodArgs.name) {
        params.name = methodArgs.name;
      }

      if (methodArgs.description) {
        params.description = methodArgs.description;
      }

      if (methodArgs.enabled !== undefined && methodArgs.enabled != null) {
        params.enabled = methodArgs.enabled === 1 || methodArgs.enabled === true;
      }

      if (methodArgs.generateDistinctId !== undefined && methodArgs.generateDistinctId != null) {
        params.generateDistinctId = methodArgs.generateDistinctId;
      }

      if (methodArgs.value && methodArgs.toString().trim().length > 0) {
        params.value = methodArgs.value;
      }

      return this.apiGateway.createApiKey(params, function createApiKeyCallback(createError, data) {
        try {
          if (createError) {
            return callback(createError);
          }

          const parsedApiKey = _this.apiKeyFactory.parseResult(data);

          return callback(null, parsedApiKey);
        } catch (error) {
          return callback(error);
        }
      });
    } catch (error) {
      return callback(error);
    }
  };

  this.deleteApiKey = function deleteApiKey(apiKey, callback) {
    try {
      if (!apiKey || apiKey.toString().trim().length === 0) {
        return callback(new Error('No api key specified for deletion.'));
      }

      const params = {
        apiKey: apiKey,
      };

      return this.apiGateway.deleteApiKey(params, function deleteApiKeyCallback(error) {
        if (error) {
          return callback(error);
        }

        return callback();
      });
    } catch (error) {
      return callback(error);
    }
  };

  this.getApiKey = function getApiKey(apiKey, callback) {
    try {
      const params = {};

      if (!apiKey || apiKey.toString().trim().length === 0) {
        return callback(new Error('No api key specified.'));
      }

      params.apiKey = apiKey;
      params.includeValue = true;

      return this.apiGateway.getApiKey(params, function getApiKeyCallback(getError, data) {
        try {
          if (getError) {
            return callback(getError);
          }

          const parsedApiKey = _this.apiKeyFactory.parseResult(data);

          return callback(null, parsedApiKey);
        } catch (error) {
          return callback(error);
        }
      });
    } catch (error) {
      return callback(error);
    }
  };

  this.disableApiKey = function disableApiKey(apiKey, callback) {
    try {
      const patchOperations = [
        {
          op: 'replace',
          path: '/enabled',
          value: 'false',
        },
      ];

      return this.updateApiKey(apiKey, patchOperations, callback);
    } catch (error) {
      return callback(error);
    }
  };

  this.enableApiKey = function enableApiKey(apiKey, callback) {
    try {
      const patchOperations = [
        {
          op: 'replace',
          path: '/enabled',
          value: 'true',
        },
      ];

      return this.updateApiKey(apiKey, patchOperations, callback);
    } catch (error) {
      return callback(error);
    }
  };

  this.updateApiKey = function updateApiKey(apiKey, patchOperations, callback) {
    try {
      let methodPatchOperations = patchOperations;

      if (!apiKey || apiKey.toString().trim().length === 0) {
        return callback(new Error('No api key specified to be updated.'));
      } else if (!methodPatchOperations || methodPatchOperations.length === 0) {
        return callback(new Error('No patch operations specified.'));
      } else if (Object.prototype.toString.call(methodPatchOperations) !== '[object Array]') {
        methodPatchOperations = [methodPatchOperations];
      }

      const params = {
        apiKey: apiKey,
        patchOperations: methodPatchOperations,
      };

      return this.apiGateway.updateApiKey(params, function updateApiKeyCallback(updateError, data) {
        try {
          if (updateError) {
            return callback(updateError);
          }

          const parsedApiKey = _this.apiKeyFactory.parseResult(data);

          return callback(null, parsedApiKey);
        } catch (error) {
          return callback(error);
        }
      });
    } catch (error) {
      return callback(error);
    }
  };

  this.addApiKeyToUsagePlan = function addApiKeyToUsagePlan(apiKey, usagePlanId, callback) {
    try {
      if (!apiKey || apiKey.toString().trim().length === 0) {
        return callback(new Error('No api key specified.'));
      } else if (!usagePlanId || usagePlanId.toString().trim().length === 0) {
        return callback(new Error('No usage plan id specified.'));
      }

      const params = {
        keyId: apiKey,
        usagePlanId: usagePlanId,
        keyType: 'API_KEY',
      };

      return this.apiGateway.createUsagePlanKey(params, function createUsagePlanKeyCallback(
        createError) {
        if (createError) {
          return callback(createError);
        }

        return callback();
      });
    } catch (error) {
      return callback(error);
    }
  };
};
