'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');
const aws = require('aws-sdk');

const assert = chai.assert;
const apiGatewayRepositoryPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'aws', 'apiGatewayRepository.js');
const awsClientPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'aws', 'awsClient.js');
const ApiGatewayRepositoryClass = require(apiGatewayRepositoryPath);
const AwsClient = require(awsClientPath);

describe('ApiGatewayRepository', function ApiGatewayRepository() {
  describe('CreateApiKey', function CreateApiKey() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'createApiKey', function createStub(args, callback) {
        return callback();
      });

      sinon.spy(apiGatewayRepo.apiKeyFactory, 'parseResult');

      apiGatewayRepo.createApiKey(null, function createApiKeyCallback(error) {
        try {
          assert.isNull(error);
          assert.equal(apiGatewayRepo.apiKeyFactory.parseResult.calledOnce, true);
          assert.equal(apiGatewayRepo.apiGateway.createApiKey.calledOnce, true);
          apiGatewayRepo.apiGateway.createApiKey.restore();
          apiGatewayRepo.apiKeyFactory.parseResult.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.createApiKey.restore();
          apiGatewayRepo.apiKeyFactory.parseResult.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('DeleteApiKey', function DeleteApiKey() {
    it('Throws error if no api key is specified', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'deleteApiKey', function deleteStub(args, callback) {
        return callback();
      });

      apiGatewayRepo.deleteApiKey(null, function deleteApiKeyCallback(error) {
        try {
          assert.isDefined(error);
          assert.equal(error.message, 'No api key specified for deletion.');
          apiGatewayRepo.apiGateway.deleteApiKey.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.deleteApiKey.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'deleteApiKey', function deleteStub(args, callback) {
        return callback();
      });

      apiGatewayRepo.deleteApiKey('foobar', function deleteApiKeyCallback(error) {
        try {
          assert.isUndefined(error);
          assert.equal(apiGatewayRepo.apiGateway.deleteApiKey.calledOnce, true);
          apiGatewayRepo.apiGateway.deleteApiKey.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.deleteApiKey.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('GetApiKey', function GetApiKey() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'getApiKey', function createStub(args, callback) {
        return callback();
      });

      sinon.spy(apiGatewayRepo.apiKeyFactory, 'parseResult');

      apiGatewayRepo.getApiKey('foobar', function getApiKeyCallback(error) {
        try {
          assert.isNull(error);
          assert.equal(apiGatewayRepo.apiKeyFactory.parseResult.calledOnce, true);
          assert.equal(apiGatewayRepo.apiGateway.getApiKey.calledOnce, true);
          apiGatewayRepo.apiGateway.getApiKey.restore();
          apiGatewayRepo.apiKeyFactory.parseResult.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.getApiKey.restore();
          apiGatewayRepo.apiKeyFactory.parseResult.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('DisableApiKey', function DisableApiKey() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'updateApiKey', function createStub(args, callback) {
        return callback();
      });

      sinon.spy(apiGatewayRepo, 'updateApiKey');

      apiGatewayRepo.disableApiKey('foobar', function disableApiKeyCallback(error) {
        try {
          assert.isNull(error);
          assert.equal(apiGatewayRepo.updateApiKey.calledOnce, true);
          apiGatewayRepo.apiGateway.updateApiKey.restore();
          apiGatewayRepo.updateApiKey.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.updateApiKey.restore();
          apiGatewayRepo.updateApiKey.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('EnableApiKey', function EnableApiKey() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'updateApiKey', function createStub(args, callback) {
        return callback();
      });

      sinon.spy(apiGatewayRepo, 'updateApiKey');

      apiGatewayRepo.enableApiKey('foobar', function enableApiKeyCallback(error) {
        try {
          assert.isNull(error);
          assert.equal(apiGatewayRepo.updateApiKey.calledOnce, true);
          apiGatewayRepo.apiGateway.updateApiKey.restore();
          apiGatewayRepo.updateApiKey.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.updateApiKey.restore();
          apiGatewayRepo.updateApiKey.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('UpdateApiKey', function UpdateApiKey() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'updateApiKey', function createStub(args, callback) {
        return callback();
      });

      sinon.spy(apiGatewayRepo.apiKeyFactory, 'parseResult');

      apiGatewayRepo.updateApiKey('foobar', ['foobar'], function updateApiKeyCallback(error) {
        try {
          assert.isNull(error);
          assert.equal(apiGatewayRepo.apiKeyFactory.parseResult.calledOnce, true);
          assert.equal(apiGatewayRepo.apiGateway.updateApiKey.calledOnce, true);
          apiGatewayRepo.apiGateway.updateApiKey.restore();
          apiGatewayRepo.apiKeyFactory.parseResult.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.updateApiKey.restore();
          apiGatewayRepo.apiKeyFactory.parseResult.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('AddApiKeyToUsagePlan', function AddApiKeyToUsagePlan() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const awsClient = new AwsClient(aws);
      const apiGatewayRepo = new ApiGatewayRepositoryClass(awsClient);

      sinon.stub(apiGatewayRepo.apiGateway, 'createUsagePlanKey', function createStub(args, callback) {
        return callback();
      });

      apiGatewayRepo.addApiKeyToUsagePlan('foobar', 'barfoo', function addApiKeyToUsagePlanCallback(error) {
        try {
          assert.isUndefined(error);
          assert.equal(apiGatewayRepo.apiGateway.createUsagePlanKey.calledOnce, true);
          apiGatewayRepo.apiGateway.createUsagePlanKey.restore();
          return done();
        } catch (innerError) {
          apiGatewayRepo.apiGateway.createUsagePlanKey.restore();
          return done(innerError);
        }
      });
    });
  });
});
