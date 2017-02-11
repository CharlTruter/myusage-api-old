'use strict';

const ConfigRepo = require('../configuration/configurationRepository.js');

module.exports = function awsClient(awsPackage) {
  const _this = this;
  this.aws = awsPackage;
  this.configRepo = new ConfigRepo();
  this.aws.config.update({
    credentials: new _this.aws.Credentials(_this.configRepo.getAwsAccessKeyId(),
      _this.configRepo.getAwsSecretAccessKey()),
  });
  this.aws.config.update({ region: _this.configRepo.getAwsRegion() });
};
