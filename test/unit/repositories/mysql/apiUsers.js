'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const SequelizeMock = require(path.join(__dirname, '..', '..', '..', 'sequelizeMock', 'sequelizeMock.js'));
const sequelizeMock = new SequelizeMock();
const assert = chai.assert;
const apiUserRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'mysql', 'apiUsers.js');

describe('MysqlApiUsersRepository', function MysqlApiUsersRepository() {
  describe('GetOneById', function GetOneById() {
    it('Returns undefined error and result if id is null', function IdNull(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);

      return apiUserRepo.getOneById(null, function getOneByIdCallback(error, response) {
        try {
          assert.isUndefined(error);
          assert.isUndefined(response);
          return done();
        } catch (innerError) {
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      apiUserRepo.getOneById(1, function getOneByIdCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('GetOneByEmailAddress', function GetOneByEmailAddress() {
    it('Returns undefined error and result if email is null', function IdNull(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);

      return apiUserRepo.getOneByEmailAddress(null,
        function getOneByEmailAddressCallback(error, response) {
          try {
            assert.isUndefined(error);
            assert.isUndefined(response);
            return done();
          } catch (innerError) {
            return done(innerError);
          }
        });
    });

    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      apiUserRepo.getOneByEmailAddress(1, function getOneByEmailAddressCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('GetOneByApiKey', function GetOneByApiKey() {
    it('Returns undefined error and result if api key is null', function ApiKeyNull(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);

      return apiUserRepo.getOneByApiKey(null,
        function getOneByApiKeyCallback(error, response) {
          try {
            assert.isUndefined(error);
            assert.isUndefined(response);
            return done();
          } catch (innerError) {
            return done(innerError);
          }
        });
    });

    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      apiUserRepo.getOneByApiKey('foobar', function getOneByApiKeyCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('GetByIds', function GetByIds() {
    it('Returns undefined error and result if ids are null', function IdsNull(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);

      return apiUserRepo.getByIds(null,
        function getByIdsCallback(error, response) {
          try {
            assert.isUndefined(error);
            assert.isUndefined(response);
            return done();
          } catch (innerError) {
            return done(innerError);
          }
        });
    });

    it('Returns undefined error and result if ids are empty', function IdsEmpty(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);

      return apiUserRepo.getByIds([],
        function getByIdsCallback(error, response) {
          try {
            assert.isUndefined(error);
            assert.isUndefined(response);
            return done();
          } catch (innerError) {
            return done(innerError);
          }
        });
    });

    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const getArgs = [
        1,
        2,
      ];

      apiUserRepo.getByIds(getArgs, function getByIdsCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.called, true);
          assert.isAtLeast(apiUserRepo.apiUserFactory.parseRow.callCount, 1);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('Create', function Create() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const createArgs = {
        id: 1,
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

      apiUserRepo.create(createArgs, function createCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('Update', function Update() {
    it('Returns undefined error and result if api user id is not set', function ApiUserIdNull(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);

      apiUserRepo.update(null, null, function updateCallback(error, response) {
        try {
          assert.isUndefined(error);
          assert.isUndefined(response);
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Returns undefined error and result if update args is empty', function EmptyArgs(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      const args = {};

      apiUserRepo.update(1, args, function updateCallback(error, response) {
        try {
          assert.isUndefined(error);
          assert.isUndefined(response);
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Returns undefined error and result if update args have no relevant keys', function IrrelevantKeys(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      const args = {
        foobar: 'barfoo',
      };

      apiUserRepo.update(1, args, function updateCallback(error, response) {
        try {
          assert.isUndefined(error);
          assert.isUndefined(response);
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods for first name argument', function CallsCorrectMethodsFirstName(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const updateArgs = {
        firstName: 'foobar',
      };

      apiUserRepo.update(1, updateArgs, function updateCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods for last name argument', function CallsCorrectMethodsLastName(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const updateArgs = {
        lastName: 'foobar',
      };

      apiUserRepo.update(1, updateArgs, function updateCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods for email address argument', function CallsCorrectMethodsEmailAddress(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const updateArgs = {
        emailAddress: 'foobar',
      };

      apiUserRepo.update(1, updateArgs, function updateCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods for password argument', function CallsCorrectMethodsPassword(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const updateArgs = {
        password: 'foobar',
      };

      apiUserRepo.update(1, updateArgs, function updateCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods for enabled argument', function CallsCorrectMethodsEnabled(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const updateArgs = {
        enabled: false,
      };

      apiUserRepo.update(1, updateArgs, function updateCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });

    it('Calls the correct methods for api key argument', function CallsCorrectMethodsApiKey(done) {
      const ApiUserRepo = require(apiUserRepoPath);
      const apiUserRepo = new ApiUserRepo(sequelizeMock);
      sinon.spy(apiUserRepo.apiUserFactory, 'parseRow');

      const updateArgs = {
        apiKey: 'foobar',
      };

      apiUserRepo.update(1, updateArgs, function updateCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(apiUserRepo.apiUserFactory.parseRow.calledOnce, true);
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          apiUserRepo.apiUserFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });
});
