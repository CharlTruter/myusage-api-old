'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const assert = chai.assert;
const SequelizeMock = require(path.join(__dirname, '..', '..', '..', 'sequelizeMock', 'sequelizeMock.js'));
const sequelizeMock = new SequelizeMock();
const apiUserPath = path.join(__dirname, '..', '..', '..', '..', 'businessLogic', 'apiUser', 'apiUser.js');
const apiUserFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'mysql', 'apiUser.js');
const ApiUserClass = require(apiUserPath);
const ApiUserFactory = require(apiUserFactoryPath);
const aws = require('aws-sdk');

describe('ApiUser', function ApiUser() {
  describe('CreateApiUser', function CreateApiUser() {
    describe('Create', function Create() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          const event = {
            'body-json': {
              firstName: 'foo',
              lastName: 'bar',
              emailAddress: 'foo@bar.com',
              password: 'foobar',
              enabled: true,
            },
          };

          sinon.stub(apiUser.apiUserValidation, 'validateCreate', function createStub(args, callback) {
            return callback();
          });

          sinon.stub(apiUser.CreateApiUser, 'createUserInDatabase', function createStub(args, callback) {
            const mockApiUser = ApiUserFactory.parseRow({
              id: 1,
              first_name: 'foo',
              last_name: 'bar',
              email_address: 'foo@bar.com',
              password: 'foobar',
              enabled: true,
              api_key: 'barfoo',
              created_at: new Date(),
              updated_at: new Date(),
            });

            return callback(null, mockApiUser);
          });

          sinon.stub(apiUser.CreateApiUser, 'createApiKey', function createStub(mockApiUser, callback) {
            return callback(null, 'apikey_foobar');
          });

          sinon.stub(apiUser.CreateApiUser, 'addApiKeyToUsagePlan', function createStub(apiKey, callback) {
            return callback();
          });

          sinon.stub(apiUser.CreateApiUser, 'updateUserApiKey', function createStub(apiUserId, apiKey, callback) {
            const mockApiUser = ApiUserFactory.parseRow({
              id: 1,
              first_name: 'foo',
              last_name: 'bar',
              email_address: 'foo@bar.com',
              password: 'foobar',
              enabled: true,
              api_key: 'barfoo',
              created_at: new Date(),
              updated_at: new Date(),
            });

            return callback(null, mockApiUser);
          });

          apiUser.CreateApiUser.create(event,
            function createCallback(error) {
              try {
                assert.isNull(error);
                assert.equal(apiUser.apiUserValidation.validateCreate.calledOnce, true);
                assert.equal(apiUser.CreateApiUser.createUserInDatabase.calledOnce, true);
                assert.equal(apiUser.CreateApiUser.createApiKey.calledOnce, true);
                assert.equal(apiUser.CreateApiUser.addApiKeyToUsagePlan.calledOnce, true);
                assert.equal(apiUser.CreateApiUser.updateUserApiKey.calledOnce, true);

                apiUser.apiUserValidation.validateCreate.restore();
                apiUser.CreateApiUser.createUserInDatabase.restore();
                apiUser.CreateApiUser.createApiKey.restore();
                apiUser.CreateApiUser.addApiKeyToUsagePlan.restore();
                apiUser.CreateApiUser.updateUserApiKey.restore();

                done();
              } catch (innerError) {
                apiUser.apiUserValidation.validateCreate.restore();
                apiUser.CreateApiUser.createUserInDatabase.restore();
                apiUser.CreateApiUser.createApiKey.restore();
                apiUser.CreateApiUser.addApiKeyToUsagePlan.restore();
                apiUser.CreateApiUser.updateUserApiKey.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });

    describe('CreateUserInDatabase', function CreateUserInDatabase() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          const event = {
            'body-json': {
              firstName: 'foo',
              lastName: 'bar',
              emailAddress: 'foo@bar.com',
              password: 'foobar',
              enabled: true,
            },
          };

          sinon.spy(apiUser.CreateApiUser, 'getPasswordFromJsonBody');

          sinon.stub(apiUser.apiUserRepo, 'create', function createStub(args, callback) {
            return callback();
          });

          apiUser.CreateApiUser.createUserInDatabase(event,
            function createCallback(error) {
              try {
                assert.isNull(error);
                assert.equal(apiUser.CreateApiUser.getPasswordFromJsonBody.calledOnce, true);
                assert.equal(apiUser.apiUserRepo.create.calledOnce, true);

                apiUser.CreateApiUser.getPasswordFromJsonBody.restore();
                apiUser.apiUserRepo.create.restore();

                done();
              } catch (innerError) {
                apiUser.CreateApiUser.getPasswordFromJsonBody.restore();
                apiUser.apiUserRepo.create.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });

    describe('GetPasswordFromJsonBody', function GetPasswordFromJsonBody() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          const event = {
            'body-json': {
              firstName: 'foo',
              lastName: 'bar',
              emailAddress: 'foo@bar.com',
              password: 'foobar',
              enabled: true,
            },
          };

          sinon.spy(apiUser.encryptionHelper, 'encryptValue');

          apiUser.CreateApiUser.createUserInDatabase(event,
            function createCallback(error) {
              try {
                assert.isNull(error);
                assert.equal(apiUser.encryptionHelper.encryptValue.calledOnce, true);

                apiUser.encryptionHelper.encryptValue.restore();

                done();
              } catch (innerError) {
                apiUser.encryptionHelper.encryptValue.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });

    describe('CreateApiKey', function CreateApiKey() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          const mockApiUser = ApiUserFactory.parseRow({
            id: 1,
            first_name: 'foo',
            last_name: 'bar',
            email_address: 'foo@bar.com',
            password: 'foobar',
            enabled: true,
            api_key: 'barfoo',
            created_at: new Date(),
            updated_at: new Date(),
          });

          sinon.spy(apiUser.CreateApiUser, 'getApiKeyName');
          sinon.spy(apiUser.CreateApiUser, 'getApiKeyDescription');
          sinon.spy(apiUser.apiKeyFactory, 'parseResult');

          sinon.stub(apiUser.apiGatewayRepo, 'createApiKey', function createStub(args, callback) {
            return callback();
          });

          apiUser.CreateApiUser.createApiKey(mockApiUser,
            function createCallback(error) {
              try {
                assert.isNull(error);
                assert.equal(apiUser.CreateApiUser.getApiKeyName.calledOnce, true);
                assert.equal(apiUser.CreateApiUser.getApiKeyDescription.calledOnce, true);
                assert.equal(apiUser.apiKeyFactory.parseResult.calledOnce, true);
                assert.equal(apiUser.apiGatewayRepo.createApiKey.calledOnce, true);

                apiUser.CreateApiUser.getApiKeyName.restore();
                apiUser.CreateApiUser.getApiKeyDescription.restore();
                apiUser.apiKeyFactory.parseResult.restore();
                apiUser.apiGatewayRepo.createApiKey.restore();

                done();
              } catch (innerError) {
                apiUser.CreateApiUser.getApiKeyName.restore();
                apiUser.CreateApiUser.getApiKeyDescription.restore();
                apiUser.apiKeyFactory.parseResult.restore();
                apiUser.apiGatewayRepo.createApiKey.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });

    describe('AddApiKeyToUsagePlan', function AddApiKeyToUsagePlan() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          sinon.spy(apiUser.configRepo, 'getAwsUsagePlanId');

          sinon.stub(apiUser.apiGatewayRepo, 'addApiKeyToUsagePlan', function createStub(apiKey, usagePlanId, callback) {
            return callback();
          });

          apiUser.CreateApiUser.addApiKeyToUsagePlan('foobar',
            function createCallback(error) {
              try {
                assert.isUndefined(error);
                assert.equal(apiUser.configRepo.getAwsUsagePlanId.calledOnce, true);
                assert.equal(apiUser.apiGatewayRepo.addApiKeyToUsagePlan.calledOnce, true);

                apiUser.configRepo.getAwsUsagePlanId.restore();
                apiUser.apiGatewayRepo.addApiKeyToUsagePlan.restore();

                done();
              } catch (innerError) {
                apiUser.configRepo.getAwsUsagePlanId.restore();
                apiUser.apiGatewayRepo.addApiKeyToUsagePlan.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });

    describe('UpdateUserApiKey', function UpdateUserApiKey() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          sinon.spy(apiUser.encryptionHelper, 'encryptValue');

          sinon.stub(apiUser.apiUserRepo, 'update', function createStub(apiUserId, args, callback) {
            return callback();
          });

          apiUser.CreateApiUser.updateUserApiKey(1, 'foobar',
            function createCallback(error) {
              try {
                assert.isNull(error);
                assert.equal(apiUser.encryptionHelper.encryptValue.calledOnce, true);
                assert.equal(apiUser.apiUserRepo.update.calledOnce, true);

                apiUser.encryptionHelper.encryptValue.restore();
                apiUser.apiUserRepo.update.restore();

                done();
              } catch (innerError) {
                apiUser.encryptionHelper.encryptValue.restore();
                apiUser.apiUserRepo.update.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });

      it('Returns error if api user id is not specified', function NoApiUserId(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          apiUser.CreateApiUser.updateUserApiKey(null, 'foobar',
            function createCallback(error) {
              try {
                assert.isDefined(error);
                assert.equal(error.message, 'No api user id specified.');
                done();
              } catch (innerError) {
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });

      it('Returns error if api key is not specified', function NoApiKey(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          apiUser.CreateApiUser.updateUserApiKey(1, null,
            function createCallback(error) {
              try {
                assert.isDefined(error);
                assert.equal(error.message, 'No api key specified.');
                done();
              } catch (innerError) {
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });

    describe('GetApiKeyName', function GetApiKeyName() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          sinon.spy(apiUser.configRepo, 'getAwsApiKeyNamePrefix');

          apiUser.CreateApiUser.getApiKeyName('foobar');

          assert.equal(apiUser.configRepo.getAwsApiKeyNamePrefix.calledOnce, true);
          apiUser.configRepo.getAwsApiKeyNamePrefix.restore();
          done();
        } catch (error) {
          done(error);
        }
      });

      it('Throws error if email address is not specified', function NoEmailAddress(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          try {
            apiUser.CreateApiUser.getApiKeyName();
            return done(new Error('No error thrown!'));
          } catch (error) {
            assert.equal(error.message, 'No email specified.');
            done();
          }
        } catch (error) {
          done(error);
        }
      });
    });

    describe('GetApiKeyDescription', function GetApiKeyDescription() {
      it('Returns the correct value', function CorrectMethods() {
        const apiUser = new ApiUserClass(sequelizeMock, aws);

        const description = apiUser.CreateApiUser.getApiKeyDescription('foobar');

        assert.equal(description, 'Api key for user foobar');
      });

      it('Throws error if email address is not specified', function NoEmailAddress(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          try {
            apiUser.CreateApiUser.getApiKeyDescription();
            return done(new Error('No error thrown!'));
          } catch (error) {
            assert.equal(error.message, 'No email specified.');
            done();
          }
        } catch (error) {
          done(error);
        }
      });
    });
  });

  describe('GetApiUser', function GetApiUser() {
    describe('GetByApiKey', function GetByApiKey() {
      it('Calls the correct methods', function CorrectMethods(done) {
        try {
          const apiUser = new ApiUserClass(sequelizeMock, aws);

          sinon.spy(apiUser.encryptionHelper, 'encryptValue');

          sinon.stub(apiUser.apiUserRepo, 'getOneByApiKey', function createStub(args, callback) {
            return callback();
          });

          apiUser.GetApiUser.getByApiKey('foobar',
            function getCallback(error) {
              try {
                assert.isUndefined(error);
                assert.equal(apiUser.encryptionHelper.encryptValue.calledOnce, true);
                assert.equal(apiUser.apiUserRepo.getOneByApiKey.calledOnce, true);

                apiUser.encryptionHelper.encryptValue.restore();
                apiUser.apiUserRepo.getOneByApiKey.restore();

                done();
              } catch (innerError) {
                apiUser.encryptionHelper.encryptValue.restore();
                apiUser.apiUserRepo.getOneByApiKey.restore();
                done(innerError);
              }
            });
        } catch (error) {
          done(error);
        }
      });
    });
  });
});
