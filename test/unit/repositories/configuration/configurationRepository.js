'use strict';

const chai = require('chai');
const path = require('path');

const assert = chai.assert;
const configRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'configuration', 'configurationRepository.js');

describe('ConfigurationRepository', function ConfigurationRepository() {
  describe('GetEncryptionSalt', function GetEncryptionSalt() {
    it('Returns the correct value from environment variables', function CorrectValue() {
      const ConfigRepo = require(configRepoPath);
      const configRepo = new ConfigRepo();

      const returnValue = configRepo.getEncryptionSalt();

      assert.isDefined(returnValue);
      assert.equal(returnValue, process.env.ENCRYPTION_SALT);
    });
  });

  describe('GetAwsAccessKeyId', function GetAwsAccessKeyId() {
    it('Returns the correct value from environment variables', function CorrectValue() {
      const ConfigRepo = require(configRepoPath);
      const configRepo = new ConfigRepo();

      const returnValue = configRepo.getAwsAccessKeyId();

      assert.isDefined(returnValue);
      assert.equal(returnValue, process.env.AWS_ACCESS_KEY_ID);
    });
  });

  describe('GetAwsSecretAccessKey', function GetAwsSecretAccessKey() {
    it('Returns the correct value from environment variables', function CorrectValue() {
      const ConfigRepo = require(configRepoPath);
      const configRepo = new ConfigRepo();

      const returnValue = configRepo.getAwsSecretAccessKey();

      assert.isDefined(returnValue);
      assert.equal(returnValue, process.env.AWS_SECRET_ACCESS_KEY);
    });
  });

  describe('GetAwsRegion', function GetAwsRegion() {
    it('Returns the correct value from environment variables', function CorrectValue() {
      const ConfigRepo = require(configRepoPath);
      const configRepo = new ConfigRepo();

      const returnValue = configRepo.getAwsRegion();

      assert.isDefined(returnValue);
      assert.equal(returnValue, process.env.AWS_REGION);
    });
  });

  describe('GetAwsApiKeyNamePrefix', function GetAwsApiKeyNamePrefix() {
    it('Returns the correct value from environment variables', function CorrectValue() {
      const ConfigRepo = require(configRepoPath);
      const configRepo = new ConfigRepo();

      const returnValue = configRepo.getAwsApiKeyNamePrefix();

      assert.isDefined(returnValue);
      assert.equal(returnValue, process.env.AWS_API_KEY_NAME_PREFIX);
    });
  });

  describe('GetAwsUsagePlanId', function GetAwsUsagePlanId() {
    it('Returns the correct value from environment variables', function CorrectValue() {
      const ConfigRepo = require(configRepoPath);
      const configRepo = new ConfigRepo();

      const returnValue = configRepo.getAwsUsagePlanId();

      assert.isDefined(returnValue);
      assert.equal(returnValue, process.env.AWS_USAGE_PLAN_ID);
    });
  });
});
