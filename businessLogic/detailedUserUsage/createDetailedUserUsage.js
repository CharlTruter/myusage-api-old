'use strict';

const UserRepo = require('../../repositories/mysql/users.js');
const DetailedUserUsageRepo = require('../../repositories/mysql/detailedUserUsage.js');

module.exports = function CreateDetailedUserUsage(sequelize) {
  const _this = this;
  this.userRepo = new UserRepo(sequelize);
  this.detailedUserUsageRepo = new DetailedUserUsageRepo(sequelize);

  this.create = function create(args, callback) {
    try {
      let methodArgs = args;

      if (!methodArgs) {
        methodArgs = {};
      }

      const usernames = args.usageEntries.map(function mapUsernames(arg) {
        return arg.username;
      });

      return this.checkUsernames(usernames, args, callback);
    } catch (error) {
      return callback(error);
    }
  };

  this.checkUsernames = function checkUsernames(usernames, args, callback) {
    try {
      return this.userRepo.getByUsernames(usernames, function getByUsernamesCallback(error, users) {
        if (error) {
          return callback(error);
        }

        const existingUsernames = users.map(function mapExisingUsers(user) {
          return user.username;
        });

        const missingUsernames = usernames.filter(function filterMissingUsernames(username) {
          return existingUsernames.indexOf(username) < 0;
        });

        if (missingUsernames.length > 0) {
          return _this.createUsers(missingUsernames, users, args, callback);
        }

        return _this.createUsages(users, args, callback);
      });
    } catch (error) {
      return callback(error);
    }
  };

  this.createUsers = function createUsers(usernames, users, args, callback) {
    const async = require('async');
    const newUsers = [];

    async.forEach(usernames, function createUser(username, asyncCallback) {
      const createArgs = {
        username: username,
        apiUserId: args.apiUserId,
      };

      return _this.userRepo.create(createArgs, function createCallback(error, newUser) {
        if (error) {
          console.log(error);
          asyncCallback(error);
        } else {
          newUsers.push(newUser);
          asyncCallback();
        }
      });
    }, function createUserCallback(error) {
      if (error) {
        callback(error);
      } else if (newUsers.length === usernames.length) {
        const allUsers = users.concat(newUsers);
        _this.createUsages(allUsers, args, callback);
      }
    });
  };

  this.createUsages = function createUsages(users, args, callback) {
    const usernameLookupInfo = this.getUsernameLookupInfo(users);

    const createManyUsageEntriesArgs = [];

    for (let i = 0; i < args.usageEntries.length; i += 1) {
      const usageEntry = args.usageEntries[i];

      createManyUsageEntriesArgs.push({
        user_id: usernameLookupInfo[usageEntry.username],
        usage_time: usageEntry.usageTime,
        bytesDownloaded: usageEntry.bytesDownloaded,
        bytesUploaded: usageEntry.bytesUploaded,
      });
    }

    this.detailedUserUsageRepo.createMany(createManyUsageEntriesArgs,
      function createManyCallback(error) {
        if (error) {
          return callback(error);
        }

        return callback();
      });
  };

  this.getUsernameLookupInfo = function getUsernameLookupInfo(users) {
    const lookupInfo = {};

    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];
      lookupInfo[user.username] = user.id;
    }

    return lookupInfo;
  };
};
