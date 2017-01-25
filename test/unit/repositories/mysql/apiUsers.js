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
});
