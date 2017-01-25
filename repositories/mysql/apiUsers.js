'use strict';

module.exports = function MysqlApiUsersRepository(sequelize) {
  const _this = this;
  this.apiUserFactory = require('./../../factories/mysql/apiUser.js');

  this.getOneById = function GetOneById(id, callback) {
    if (!id) {
      return callback();
    }

    return sequelize.ApiUser.findById(id)
      .then(function FindApiUserByIdCallback(apiUser) {
        if (!apiUser || !apiUser.get()) {
          return callback();
        }

        return callback(null, _this.apiUserFactory.parseRow(apiUser));
      })
      .catch(function FindApiUserByIdErrorCallback(error) {
        return callback(error);
      });
  };

  this.getOneByEmailAddress = function getOneByEmailAddress(email, callback) {
    if (!email) {
      return callback();
    }

    return sequelize.ApiUser.findAll({
      limit: 1,
      where: {
        email_address: email,
      },
    }).then(function FindApiUserByEmailCallback(apiUsers) {
      if (apiUsers && apiUsers.length > 0 && apiUsers[0].get()) {
        return callback(null, _this.apiUserFactory.parseRow(apiUsers[0].get()));
      }

      return callback();
    }).catch(function FindApiUserByEmailErrorCallback(error) {
      return callback(error);
    });
  };

  this.getByIds = function getByIds(ids, callback) {
    if (!ids || ids.length === 0) {
      return callback();
    }

    return sequelize.ApiUser.findAll({
      where: {
        id: ids,
      },
    }).then(function FindApiUserByIdsCallback(apiUsers) {
      if (apiUsers && apiUsers.length > 0) {
        const parsedApiUsers = [];

        for (let i = 0; i < apiUsers.length; i += 1) {
          const apiUser = apiUsers[i].get();
          if (apiUser) {
            const parsedApiUser = _this.apiUserFactory.parseRow(apiUser);

            if (parsedApiUser) {
              parsedApiUsers.push(parsedApiUser);
            }
          }
        }
        return callback(null, parsedApiUsers);
      }

      return callback();
    }).catch(function FindApiUserByIdsCallbackError(error) {
      return callback(error);
    });
  };

  this.create = function CreateMysqlApiUser(args, callback) {
    let methodArgs = args;

    if (!methodArgs) {
      methodArgs = {};
    }

    return sequelize.ApiUser.create({
      first_name: methodArgs.firstName,
      last_name: methodArgs.lastName,
      email_address: methodArgs.emailAddress,
      password_hash: methodArgs.passwordHash,
      api_access: methodArgs.apiAccess,
      website_access: methodArgs.websiteAccess,
      api_key: methodArgs.apiKey,
    }).then(function CreateMysqlApiUserCallback(apiUser) {
      return callback(null, _this.apiUserFactory.parseRow(apiUser.get()));
    }).catch(function CreateMysqlApiUserErrorCallback(error) {
      return callback(error);
    });
  };
};
