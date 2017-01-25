'use strict';

const chai = require('chai');
const path = require('path');
const jsonSchema = require('jsonschema');
const fs = require('fs');

const SequelizeHelper = require(path.join(__dirname, '..', '..', '..', 'sequelizeHelper', 'sequelizeHelper.js'));
const assert = chai.assert;
const sequelizeHelper = new SequelizeHelper();
const apiUserRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'mysql', 'apiUsers.js');

function createApiUser(increment, callback) {
  sequelizeHelper.sequelize.ApiUser.create({
    first_name: `Charl ${increment}`,
    last_name: `Truter ${increment}`,
    email_address: `email_${increment}@address.com`,
    password_hash: `SOMEPASSWORDHASH_${increment}`,
    api_access: 1,
    website_access: 0,
    api_key: `SOMEAPIKEY_${increment}`,
  }).then(function CreateMysqlApiUserCallback(apiUser) {
    return callback(null, apiUser);
  }).catch(function CreateMysqlApiUserCallbackError(error) {
    return callback(error);
  });
}

describe('MysqlApiUsersRepository', function MysqlApiUsersRepository() {
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      createApiUser(1, function createApiUserCallback(error, apiUser) {
        try {
          assert.isNull(error);
          assert.isDefined(apiUser);

          apiUserRepo.getOneById(apiUser.id, function getOneByIdCallback(getError, response) {
            try {
              assert.isNull(getError);
              const validator = new jsonSchema.Validator();
              const apiUserSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'apiUser.json'), 'utf8'));

              const validationResult = validator.validate(response, apiUserSchema);
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      createApiUser(1, function createApiUserCallback(error, apiUser) {
        try {
          assert.isNull(error);
          assert.isDefined(apiUser);

          apiUserRepo.getOneById(apiUser.id, function getOneByIdCallback(getError, response) {
            try {
              assert.isNull(getError);
              assert.equal(response.firstName, apiUser.first_name);
              assert.equal(response.lastName, apiUser.last_name);
              assert.equal(response.emailAddress, apiUser.email_address);
              assert.equal(response.passwordHash, apiUser.password_hash);
              assert.equal(response.apiAccess, apiUser.api_access);
              assert.equal(response.websiteAccess, apiUser.website_access);
              assert.equal(response.apiKey, apiUser.api_key);
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      apiUserRepo.getOneById(999, function getOneByIdCallback(getError, response) {
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

  describe('GetOneByEmailAddress', function GetOneByEmailAddress() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      createApiUser(1, function createApiUserCallback(error, apiUser) {
        try {
          assert.isNull(error);
          assert.isDefined(apiUser);

          apiUserRepo.getOneByEmailAddress(apiUser.email_address,
            function getOneByEmailAddressCallback(getError, response) {
              try {
                assert.isNull(getError);
                const validator = new jsonSchema.Validator();
                const apiUserSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'apiUser.json'), 'utf8'));

                const validationResult = validator.validate(response, apiUserSchema);
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      createApiUser(1, function createApiUserCallback(error, apiUser) {
        try {
          assert.isNull(error);
          assert.isDefined(apiUser);

          apiUserRepo.getOneByEmailAddress(apiUser.email_address,
            function getOneByEmailAddressCallback(getError, response) {
              try {
                assert.isNull(getError);
                assert.equal(response.firstName, apiUser.first_name);
                assert.equal(response.lastName, apiUser.last_name);
                assert.equal(response.emailAddress, apiUser.email_address);
                assert.equal(response.passwordHash, apiUser.password_hash);
                assert.equal(response.apiAccess, apiUser.api_access);
                assert.equal(response.websiteAccess, apiUser.website_access);
                assert.equal(response.apiKey, apiUser.api_key);
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

    it('Returns nothing if email address does not exist', function NonExistantId(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      apiUserRepo.getOneByEmailAddress('foobar', function getOneByEmailAddressCallback(getError, response) {
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

  describe('GetByIds', function GetByUsernames() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      createApiUser(1, function createApiUserOneCallback(apiUserOneError, apiUserOne) {
        try {
          assert.isNull(apiUserOneError);
          assert.isDefined(apiUserOne);

          createApiUser(2, function createUserTwoCallback(apiUserTwoError, apiUserTwo) {
            try {
              assert.isNull(apiUserTwoError);
              assert.isDefined(apiUserTwo);

              createApiUser(3, function createUserThreeCallback(apiUserThreeError, apiUserThree) {
                try {
                  assert.isNull(apiUserThreeError);
                  assert.isDefined(apiUserThree);

                  const getArgs = [
                    apiUserTwo.id,
                    apiUserThree.id,
                  ];

                  apiUserRepo.getByIds(getArgs, function getByIdsCallback(getError,
                    responses) {
                    try {
                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);
                      const validator = new jsonSchema.Validator();
                      const apiUserSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'apiUser.json'), 'utf8'));

                      for (let i = 0; i < responses.length; i += 1) {
                        const response = responses[i];
                        const validationResult = validator.validate(response, apiUserSchema);
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      createApiUser(1, function createApiUserOneCallback(apiUserOneError, apiUserOne) {
        try {
          assert.isNull(apiUserOneError);
          assert.isDefined(apiUserOne);

          createApiUser(2, function createUserTwoCallback(apiUserTwoError, apiUserTwo) {
            try {
              assert.isNull(apiUserTwoError);
              assert.isDefined(apiUserTwo);

              createApiUser(3, function createUserThreeCallback(apiUserThreeError, apiUserThree) {
                try {
                  assert.isNull(apiUserThreeError);
                  assert.isDefined(apiUserThree);

                  const getArgs = [
                    apiUserTwo.id,
                    apiUserThree.id,
                  ];

                  apiUserRepo.getByIds(getArgs, function getByIdsCallback(getError,
                    responses) {
                    try {
                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);

                      assert.isNull(getError);
                      assert.lengthOf(responses, 2);

                      const apiUserTwoMatches = responses.filter(
                        function filterApiUserTwo(response) {
                          return response.id === apiUserTwo.id;
                        });

                      assert.lengthOf(apiUserTwoMatches, 1);

                      const apiUserTwoMatch = apiUserTwoMatches[0];

                      assert.equal(apiUserTwoMatch.firstName, apiUserTwo.first_name);
                      assert.equal(apiUserTwoMatch.lastName, apiUserTwo.last_name);
                      assert.equal(apiUserTwoMatch.emailAddress, apiUserTwo.email_address);
                      assert.equal(apiUserTwoMatch.passwordHash, apiUserTwo.password_hash);
                      assert.equal(apiUserTwoMatch.apiAccess, apiUserTwo.api_access);
                      assert.equal(apiUserTwoMatch.websiteAccess, apiUserTwo.website_access);
                      assert.equal(apiUserTwoMatch.apiKey, apiUserTwo.api_key);

                      const apiUserThreeMatches = responses.filter(
                        function filterApiUserThree(response) {
                          return response.id === apiUserThree.id;
                        });

                      assert.lengthOf(apiUserThreeMatches, 1);

                      const apiUserThreeMatch = apiUserThreeMatches[0];

                      assert.equal(apiUserThreeMatch.firstName, apiUserThree.first_name);
                      assert.equal(apiUserThreeMatch.lastName, apiUserThree.last_name);
                      assert.equal(apiUserThreeMatch.emailAddress, apiUserThree.email_address);
                      assert.equal(apiUserThreeMatch.passwordHash, apiUserThree.password_hash);
                      assert.equal(apiUserThreeMatch.apiAccess, apiUserThree.api_access);
                      assert.equal(apiUserThreeMatch.websiteAccess, apiUserThree.website_access);
                      assert.equal(apiUserThreeMatch.apiKey, apiUserThree.api_key);
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      const getArgs = [
        990,
        991,
      ];

      apiUserRepo.getByIds(getArgs, function getByIds(getError, response) {
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
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      const createArgs = {
        firstName: 'Charl',
        lastName: 'Truter',
        emailAddress: 'foo@bar.com',
        passwordHash: 'ASDF1234',
        apiAccess: true,
        websiteAccess: false,
        apiKey: '987FDSA',
      };

      apiUserRepo.create(createArgs, function createCallback(createError, response) {
        try {
          assert.isNull(createError);
          const validator = new jsonSchema.Validator();
          const apiUserSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'apiUser.json'), 'utf8'));

          const validationResult = validator.validate(response, apiUserSchema);
          assert.lengthOf(validationResult.errors, 0);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns the correct data for the entry', function CorrectData(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      const createArgs = {
        firstName: 'Charl',
        lastName: 'Truter',
        emailAddress: 'foo@bar.com',
        passwordHash: 'ASDF1234',
        apiAccess: true,
        websiteAccess: false,
        apiKey: '987FDSA',
      };

      apiUserRepo.create(createArgs, function createCallback(createError, response) {
        try {
          assert.isNull(createError);
          assert.equal(response.firstName, createArgs.firstName);
          assert.equal(response.lastName, createArgs.lastName);
          assert.equal(response.emailAddress, createArgs.emailAddress);
          assert.isDefined(response.passwordHash);
          assert.equal(response.apiAccess, true);
          assert.equal(response.websiteAccess, false);
          assert.isDefined(response.apiKey);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Creates the data in the database', function IdNull(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeHelper.sequelize);

      const createArgs = {
        firstName: 'John',
        lastName: 'Smith',
        emailAddress: 'foo@bar.com',
        passwordHash: 'PASSWORDHASH',
        apiAccess: 1,
        websiteAccess: 1,
        apiKey: 'APIKEY',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      sequelizeHelper.sequelize.ApiUser.findAll({
        limit: 1,
        where: {
          email_address: createArgs.emailAddress,
        },
      }).then(function findAllCallback(apiUsers) {
        assert.lengthOf(apiUsers, 0);

        apiUserRepo.create(createArgs, function createCallback(error, response) {
          try {
            assert.isNull(error);
            assert.isDefined(response);
            return sequelizeHelper.sequelize.ApiUser.findAll({
              limit: 1,
              where: {
                email_address: createArgs.emailAddress,
              },
            }).then(function findAllInnerCallback(afterCreateApiUser) {
              assert.lengthOf(afterCreateApiUser, 1);
              const apiUser = afterCreateApiUser[0].get();
              assert.equal(apiUser.email_address, createArgs.emailAddress);
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
