'use strict';

module.exports = function MysqlUsersRepository(sequelize) {
  const _this = this;
  this.userFactory = require('./../../factories/mysql/user.js');

  this.getOneById = function GetOneById(id, callback) {
    if (!id) {
      return callback();
    }

    return sequelize.User.findById(id)
      .then(function FindUserByIdCallback(user) {
        if (!user || !user.get()) {
          return callback();
        }

        return callback(null, _this.userFactory.parseRow(user.get()));
      })
      .catch(function FindUserByIdErrorCallback(error) {
        return callback(error);
      });
  };

  this.getByUsernames = function GetByUsernames(usernames, callback) {
    if (!usernames || usernames.length === 0) {
      return callback();
    }

    return sequelize.User.findAll({
      where: {
        username: usernames,
      },
    }).then(function GetByUsernamesCallback(users) {
      if (users && users.length > 0) {
        const parsedUsers = [];

        for (let i = 0; i < users.length; i += 1) {
          const user = users[i].get();

          if (user) {
            const parsedUser = _this.userFactory.parseRow(user);

            if (parsedUser) {
              parsedUsers.push(parsedUser);
            }
          }
        }

        return callback(null, parsedUsers);
      }

      return callback();
    }).catch(function GetByUsernamesErrorCallback(error) {
      return callback(error);
    });
  };

  this.getByIds = function GetByIds(ids, callback) {
    if (!ids || ids.length === 0) {
      return callback();
    }

    return sequelize.User.findAll({
      where: {
        id: ids,
      },
    }).then(function GetByIdsCallback(users) {
      if (users && users.length > 0) {
        const parsedUsers = [];

        for (let i = 0; i < users.length; i += 1) {
          const user = users[i].get();

          if (user) {
            const parsedUser = _this.userFactory.parseRow(user);

            if (parsedUser) {
              parsedUsers.push(parsedUser);
            }
          }
        }

        return callback(null, parsedUsers);
      }

      return callback();
    }).catch(function GetByIdsErrorCallback(error) {
      return callback(error);
    });
  };

  this.create = function CreateMysqlUser(args, callback) {
    let methodArgs = args;

    if (!methodArgs) {
      methodArgs = {};
    }

    return sequelize.User.create({
      username: methodArgs.username,
      display_name: methodArgs.displayName,
      api_user_id: methodArgs.apiUserId,
    }).then(function CreateMysqlUserCallback(user) {
      const parsedUser = _this.userFactory.parseRow(user.get());
      return callback(null, parsedUser);
    }).catch(function CreateMysqlUserErrorCallback(error) {
      return callback(error);
    });
  };
};
