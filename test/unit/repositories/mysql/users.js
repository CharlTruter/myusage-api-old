'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const SequelizeMock = require(path.join(__dirname, '..', '..', '..', 'sequelizeMock', 'sequelizeMock.js'));
const sequelizeMock = new SequelizeMock();
const assert = chai.assert;
const userRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'mysql', 'users.js');

describe('MysqlUsersRepository', function MysqlUsersRepository() {
  describe('GetOneById', function GetOneById() {
    it('Returns undefined error and result if id is null', function IdNull(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);

      return userRepo.getOneById(null, function getOneByIdCallback(error, response) {
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
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);
      sinon.spy(userRepo.userFactory, 'parseRow');

      userRepo.getOneById(1, function getOneByIdCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(userRepo.userFactory.parseRow.calledOnce, true);
          userRepo.userFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          userRepo.userFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('GetByUsernames', function GetByUsernames() {
    it('Returns undefined error and result if usernames are null', function UsernamesNull(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);

      return userRepo.getByUsernames(null,
        function getByUsernamesCallback(error, response) {
          try {
            assert.isUndefined(error);
            assert.isUndefined(response);
            return done();
          } catch (innerError) {
            return done(innerError);
          }
        });
    });

    it('Returns undefined error and result if usernames are empty', function UsernamesEmpty(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);

      return userRepo.getByUsernames([],
        function getByUsernamesCallback(error, response) {
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
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);
      sinon.spy(userRepo.userFactory, 'parseRow');

      const getArgs = [
        'foobar',
        'barfoo',
      ];

      userRepo.getByUsernames(getArgs, function getByUsernamesCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(userRepo.userFactory.parseRow.called, true);
          assert.isAtLeast(userRepo.userFactory.parseRow.callCount, 1);
          userRepo.userFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          userRepo.userFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('GetByIds', function GetByIds() {
    it('Returns undefined error and result if ids are null', function IdsNull(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);

      return userRepo.getByIds(null,
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
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);

      return userRepo.getByIds([],
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
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);
      sinon.spy(userRepo.userFactory, 'parseRow');

      const getArgs = [
        1,
        2,
      ];

      userRepo.getByIds(getArgs, function getByIdsCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(userRepo.userFactory.parseRow.called, true);
          assert.isAtLeast(userRepo.userFactory.parseRow.callCount, 1);
          userRepo.userFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          userRepo.userFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('Create', function Create() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const UserRepo = require(userRepoPath);
      const userRepo = new UserRepo(sequelizeMock);
      sinon.spy(userRepo.userFactory, 'parseRow');

      const createArgs = {
        id: 1,
        username: 'johnsmith',
        display_name: 'John Smith',
        api_user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };

      userRepo.create(createArgs, function createCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(userRepo.userFactory.parseRow.calledOnce, true);
          userRepo.userFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          userRepo.userFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });
});
