'use strict';

module.exports = function configurationRepository() {
  this.getEncryptionSalt = function getEncryptionSalt() {
    return process.env.ENCRYPTION_SALT;
  };

  this.getAwsAccessKeyId = function getAwsAccessKeyId() {
    return process.env.AWS_ACCESS_KEY_ID;
  };

  this.getAwsSecretAccessKey = function getAwsSecretAccessKey() {
    return process.env.AWS_SECRET_ACCESS_KEY;
  };

  this.getAwsRegion = function getAwsRegion() {
    return process.env.AWS_REGION;
  };

  this.getAwsApiKeyNamePrefix = function getAwsApiKeyNamePrefix() {
    return process.env.AWS_API_KEY_NAME_PREFIX;
  };

  this.getAwsUsagePlanId = function getAwsUsagePlanId() {
    return process.env.AWS_USAGE_PLAN_ID;
  };
};
