'use strict';

const validationHelper = require('../validation/validationHelper.js');

module.exports = function DetailedUserUsageValidation(sequelize) {
  this.validateCreateDetailedUserUsage = function validateCreateDetailedUserUsage(args, callback) {
    try {
      if (!validationHelper.isNonNegativeInteger(args.apiUserId)) {
        throw new Error('Api user id must be a non-negative integer');
      }

      if (!args.usageEntries) {
        throw new Error('No usage entries specified.');
      } else if (Object.prototype.toString.call(args.usageEntries) !== '[object Array]') {
        return new Error('Usage entries is expected in an array.');
      }

      for (let i = 0; i < args.usageEntries.length; i += 1) {
        const usageEntry = args.usageEntries[i];

        this.validateSingleDetailedUserUsage(usageEntry);
      }

      return this.checkApiUserId(args.apiUserId, callback);
    } catch (error) {
      return callback(error);
    }
  };

  this.validateSingleDetailedUserUsage = function validateSingleDetailedUserUsage(usageEntry) {
    let methodUsageEntry = usageEntry;

    if (!methodUsageEntry) {
      methodUsageEntry = {};
    }

    if (!validationHelper.isValidString(methodUsageEntry.username)) {
      throw new Error('Non-string username has been specified.');
    } else if (validationHelper.isWhitespaceOrEmptyString(methodUsageEntry.username)) {
      throw new Error('Blank username is specified.');
    }

    if (!validationHelper.isNonNegativeInteger(methodUsageEntry.bytesDownloaded)) {
      throw new Error('Bytes downloaded must be a non-negative integer');
    }

    if (!validationHelper.isNonNegativeInteger(methodUsageEntry.bytesUploaded)) {
      throw new Error('Bytes uploaded must be a non-negative integer');
    }

    if (!validationHelper.isValidDate(methodUsageEntry.usageTime)) {
      throw new Error('Usage time must be a valid date');
    }
  };

  this.checkApiUserId = function checkApiUserId(apiUserId, callback) {
    try {
      const ApiUserRepo = require('../../repositories/mysql/apiUsers.js');
      const apiUserRepo = new ApiUserRepo(sequelize);

      return apiUserRepo.getOneById(apiUserId, function getCallback(error, apiUser) {
        try {
          if (error) {
            return callback(error);
          }

          if (!apiUser) {
            throw new Error(`Api user ${apiUserId} does not exist.`);
          }

          return callback();
        } catch (innerError) {
          return callback(innerError);
        }
      });
    } catch (error) {
      return callback(error);
    }
  };
};
