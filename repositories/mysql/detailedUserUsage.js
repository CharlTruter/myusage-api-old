'use strict';

module.exports = function MysqlDetailedUserUsageRepository(sequelize) {
  const _this = this;
  this.detailedUserUsageFactory = require('./../../factories/mysql/detailedUserUsage.js');

  this.create = function CreateMysqlDetailedUserUsage(args, callback) {
    let methodArgs = args;

    if (!methodArgs) {
      methodArgs = {};
    }

    return sequelize.DetailedUserUsage.create({
      user_id: methodArgs.userId,
      usage_time: methodArgs.usageTime,
      bytes_downloaded: methodArgs.bytesDownloaded,
      bytes_uploaded: methodArgs.bytesUploaded,
    }).then(function CreateMysqlDetailedUserUsageCallback(detailedUserUsage) {
      return callback(null, _this.detailedUserUsageFactory.parseRow(detailedUserUsage.get()));
    }).catch(function CreateMysqlDetailedUserUsageErrorCallback(error) {
      return callback(error);
    });
  };

  this.createMany = function CreateMysqlDetailedUserUsages(args, callback) {
    let methodArgs = args;

    if (!methodArgs) {
      methodArgs = [];
    }

    const createArgs = [];

    for (let argCount = 0; argCount < methodArgs.length; argCount += 1) {
      const arg = methodArgs[argCount];

      createArgs.push({
        user_id: arg.userId,
        usage_time: arg.usageTime,
        bytes_downloaded: arg.bytesDownloaded,
        bytes_uploaded: arg.bytesUploaded,
      });
    }

    if (createArgs.length === 0) {
      return callback();
    }

    return sequelize.DetailedUserUsage.bulkCreate(createArgs)
      .then(function CreateMysqlDetailedUserUsagesCallback() {
        return callback();
      }).catch(function CreateMysqlDetailedUserUsagesErrorCallback(error) {
        return callback(error);
      });
  };
};
