'use strict';

const chai = require('chai');
const path = require('path');
const jsonSchema = require('jsonschema');
const fs = require('fs');

const SequelizeHelper = require(path.join(__dirname, '..', '..', '..', 'sequelizeHelper', 'sequelizeHelper.js'));
const assert = chai.assert;
const sequelizeHelper = new SequelizeHelper();
const userRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'mysql', 'users.js');

function createUser(increment, callback) {
  sequelizeHelper.sequelize.User.create({
    id: increment,
    username: `johnsmith${increment}`,
    display_name: `John Smith ${increment}`,
    api_user_id: increment,
    created_at: new Date(),
    updated_at: new Date(),
  }).then(function CreateMysqlUserCallback(user) {
    return callback(null, user);
  }).catch(function CreateMysqlUserErrorCallback(error) {
    return callback(error);
  });
}

describe('MysqlUsersRepository', function MysqlUsersRepository() {
  beforeEach(function beforeEach(done) {
    return sequelizeHelper.truncateTables(function truncateTablesCallback(error) {
      try {
        assert.isUndefined(error);
        return done();
      } catch (innerError) {
        return done(innerError);
      }
    });
  });

  describe('GetOneById', function GetOneById() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      createUser(1, function createUserCallback(error, user) {
        try {
          assert.isNull(error);
          assert.isDefined(user);

          userRepo.getOneById(user.id, function getOneByIdCallback(getError, response) {
            try {
              assert.isNull(getError);
              const validator = new jsonSchema.Validator();
              const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'user.json'), 'utf8'));

              const validationResult = validator.validate(response, userSchema);
              assert.lengthOf(validationResult.errors, 0);
              done();
            } catch (innerError) {
              done(innerError);
            }
          });
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns the correct data for the entry', function CorrectData(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      createUser(1, function createUserCallback(error, user) {
        try {
          assert.isNull(error);
          assert.isDefined(user);

          userRepo.getOneById(user.id, function getOneByIdCallback(getError, response) {
            try {
              assert.isNull(getError);
              assert.equal(response.username, user.username);
              assert.equal(response.displayName, user.display_name);
              assert.equal(response.apiUserId, user.api_user_id);
              done();
            } catch (innerError) {
              done(innerError);
            }
          });
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns nothing if id does not exist', function NonExistantId(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      userRepo.getOneById(999, function getOneByIdCallback(getError, response) {
        try {
          assert.isUndefined(getError);
          assert.isUndefined(response);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });
  });

  describe('GetByUsernames', function GetByUsernames() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      createUser(1, function createUserOneCallback(userOneError, userOne) {
        try {
          assert.isNull(userOneError);
          assert.isDefined(userOne);

          createUser(2, function createUserTwoCallback(userTwoError, userTwo) {
            try {
              assert.isNull(userTwoError);
              assert.isDefined(userTwo);

              createUser(3, function createUserThreeCallback(userThreeError, userThree) {
                try {
                  assert.isNull(userThreeError);
                  assert.isDefined(userThree);

                  const getArgs = [
                    userTwo.username,
                    userThree.username,
                  ];

                  userRepo.getByUsernames(getArgs, function getByUsernamesCallback(getError,
                    responses) {
                    try {
                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);
                      const validator = new jsonSchema.Validator();
                      const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'user.json'), 'utf8'));

                      for (let i = 0; i < responses.length; i += 1) {
                        const response = responses[i];
                        const validationResult = validator.validate(response, userSchema);
                        assert.lengthOf(validationResult.errors, 0);
                      }
                      done();
                    } catch (innerError) {
                      done(innerError);
                    }
                  });
                } catch (innerError) {
                  done(innerError);
                }
              });
            } catch (innerError) {
              done(innerError);
            }
          });
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns the correct data for the entry', function CorrectData(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      createUser(1, function createUserOneCallback(userOneError, userOne) {
        try {
          assert.isNull(userOneError);
          assert.isDefined(userOne);

          createUser(2, function createUserTwoCallback(userTwoError, userTwo) {
            try {
              assert.isNull(userTwoError);
              assert.isDefined(userTwo);

              createUser(3, function createUserThreeCallback(userThreeError, userThree) {
                try {
                  assert.isNull(userThreeError);
                  assert.isDefined(userThree);

                  const getArgs = [
                    userTwo.username,
                    userThree.username,
                  ];

                  userRepo.getByUsernames(getArgs, function getByUsernamesCallback(getError,
                    responses) {
                    try {
                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);

                      const userTwoMatches = responses.filter(function filterUserTwo(response) {
                        return response.username === userTwo.username;
                      });

                      assert.lengthOf(userTwoMatches, 1);

                      const userTwoMatch = userTwoMatches[0];

                      assert.equal(userTwoMatch.username, userTwo.username);
                      assert.equal(userTwoMatch.displayName, userTwo.display_name);
                      assert.equal(userTwoMatch.apiUserId, userTwo.api_user_id);

                      const userThreeMatches = responses.filter(function filterUserThree(response) {
                        return response.username === userThree.username;
                      });

                      assert.lengthOf(userThreeMatches, 1);

                      const userThreeMatch = userThreeMatches[0];

                      assert.equal(userThreeMatch.username, userThree.username);
                      assert.equal(userThreeMatch.displayName, userThree.display_name);
                      assert.equal(userThreeMatch.apiUserId, userThree.api_user_id);
                      done();
                    } catch (innerError) {
                      done(innerError);
                    }
                  });
                } catch (innerError) {
                  done(innerError);
                }
              });
            } catch (innerError) {
              done(innerError);
            }
          });
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns nothing if usernames do not exist', function NonExistantUsernames(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      const getArgs = [
        'foobar',
        'barfoo',
      ];

      userRepo.getByUsernames(getArgs, function getByUsernamesCallback(getError, response) {
        try {
          assert.isUndefined(getError);
          assert.isUndefined(response);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });
  });

  describe('GetByIds', function GetByIds() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      createUser(1, function createUserOneCallback(userOneError, userOne) {
        try {
          assert.isNull(userOneError);
          assert.isDefined(userOne);

          createUser(2, function createUserTwoCallback(userTwoError, userTwo) {
            try {
              assert.isNull(userTwoError);
              assert.isDefined(userTwo);

              createUser(3, function createUserThreeCallback(userThreeError, userThree) {
                try {
                  assert.isNull(userThreeError);
                  assert.isDefined(userThree);

                  const getArgs = [
                    userTwo.id,
                    userThree.id,
                  ];

                  userRepo.getByIds(getArgs, function getByIdsCallback(getError,
                    responses) {
                    try {
                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);
                      const validator = new jsonSchema.Validator();
                      const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'user.json'), 'utf8'));

                      for (let i = 0; i < responses.length; i += 1) {
                        const response = responses[i];
                        const validationResult = validator.validate(response, userSchema);
                        assert.lengthOf(validationResult.errors, 0);
                      }
                      done();
                    } catch (innerError) {
                      done(innerError);
                    }
                  });
                } catch (innerError) {
                  done(innerError);
                }
              });
            } catch (innerError) {
              done(innerError);
            }
          });
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns the correct data for the entry', function CorrectData(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      createUser(1, function createUserOneCallback(userOneError, userOne) {
        try {
          assert.isNull(userOneError);
          assert.isDefined(userOne);

          createUser(2, function createUserTwoCallback(userTwoError, userTwo) {
            try {
              assert.isNull(userTwoError);
              assert.isDefined(userTwo);

              createUser(3, function createUserThreeCallback(userThreeError, userThree) {
                try {
                  assert.isNull(userThreeError);
                  assert.isDefined(userThree);

                  const getArgs = [
                    userTwo.id,
                    userThree.id,
                  ];

                  userRepo.getByIds(getArgs, function getByIdsCallback(getError,
                    responses) {
                    try {
                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);

                      const userTwoMatches = responses.filter(function filterUserTwo(response) {
                        return response.id === userTwo.id;
                      });

                      assert.lengthOf(userTwoMatches, 1);

                      const userTwoMatch = userTwoMatches[0];

                      assert.equal(userTwoMatch.username, userTwo.username);
                      assert.equal(userTwoMatch.displayName, userTwo.display_name);
                      assert.equal(userTwoMatch.apiUserId, userTwo.api_user_id);

                      const userThreeMatches = responses.filter(function filterUserThree(response) {
                        return response.id === userThree.id;
                      });

                      assert.lengthOf(userThreeMatches, 1);

                      const userThreeMatch = userThreeMatches[0];

                      assert.equal(userThreeMatch.username, userThree.username);
                      assert.equal(userThreeMatch.displayName, userThree.display_name);
                      assert.equal(userThreeMatch.apiUserId, userThree.api_user_id);
                      done();
                    } catch (innerError) {
                      done(innerError);
                    }
                  });
                } catch (innerError) {
                  done(innerError);
                }
              });
            } catch (innerError) {
              done(innerError);
            }
          });
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns nothing if ids do not exist', function NonExistantIds(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      const getArgs = [
        990,
        991,
      ];

      userRepo.getByIds(getArgs, function getByIdsCallback(getError, response) {
        try {
          assert.isUndefined(getError);
          assert.isUndefined(response);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });
  });

  describe('Create', function Create() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      const createArgs = {
        username: 'johnsmith',
        displayName: 'John Smith',
        apiUserId: 1,
      };

      userRepo.create(createArgs, function createCallback(createError, response) {
        try {
          assert.isNull(createError);
          const validator = new jsonSchema.Validator();
          const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'user.json'), 'utf8'));

          const validationResult = validator.validate(response, userSchema);
          assert.lengthOf(validationResult.errors, 0);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns the correct data for the entry', function CorrectData(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      const createArgs = {
        username: 'johnsmith',
        displayName: 'John Smith',
        apiUserId: 1,
      };

      userRepo.create(createArgs, function createCallback(createError, response) {
        try {
          assert.isNull(createError);
          assert.equal(response.username, createArgs.username);
          assert.equal(response.displayName, createArgs.displayName);
          assert.equal(response.apiUserId, createArgs.apiUserId);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Creates the data in the database', function IdNull(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeHelper.sequelize);

      const createArgs = {
        username: 'johnsmith',
        displayName: 'John Smith',
        apiUserId: 1,
      };

      sequelizeHelper.sequelize.User.findAll({
        limit: 1,
        where: {
          username: createArgs.username,
        },
      }).then(function findAllCallback(users) {
        assert.lengthOf(users, 0);

        userRepo.create(createArgs, function createCallback(error, response) {
          try {
            assert.isNull(error);
            assert.isDefined(response);
            return sequelizeHelper.sequelize.User.findAll({
              limit: 1,
              where: {
                username: createArgs.username,
              },
            }).then(function findAllInnerCallback(afterCreateUser) {
              assert.lengthOf(afterCreateUser, 1);
              const user = afterCreateUser[0].get();
              assert.equal(user.username, createArgs.username);
              return done();
            }).catch(function findAllErrorCallback(finderror) {
              return done(finderror);
            });
          } catch (innerError) {
            return done(innerError);
          }
        });
      }).catch(function findAllErrorCallback(finderror) {
        return done(finderror);
      });
    });
  });
});
