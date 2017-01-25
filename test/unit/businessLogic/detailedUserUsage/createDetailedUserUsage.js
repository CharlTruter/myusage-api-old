'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const assert = chai.assert;
const createDetailedUserUsagePath = path.join(__dirname, '..', '..', '..', '..', 'businessLogic', 'detailedUserUsage', 'createDetailedUserUsage.js');
const SequelizeMock = require(path.join(__dirname, '..', '..', '..', 'sequelizeMock', 'sequelizeMock.js'));
const sequelizeMock = new SequelizeMock();

describe('CreateDetailedUserUsage', function CreateDetailedUserUsage() {
  describe('Create', function Create() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      try {
        const CreateUsage = require(createDetailedUserUsagePath);
        const createUsage = new CreateUsage(sequelizeMock);

        const createArgs = {
          usageEntries: [
            {
              username: 'foobar',
              usageTime: new Date(),
              bytesDownloaded: 1234,
              bytesUploaded: 4321,
            },
            {
              username: 'barfoo',
              usageTime: new Date(),
              bytesDownloaded: 9876,
              bytesUploaded: 6789,
            },
          ],
          apiUserId: 1,
        };

        sinon.spy(createUsage, 'checkUsernames');

        createUsage.create(createArgs,
          function createCallback(error) {
            try {
              assert.isUndefined(error);
              assert.equal(createUsage.checkUsernames.calledOnce, true);

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });
  });

  describe('CheckUsernames', function CheckUsernames() {
    it('Calls the correct methods if username does not exist', function CallsCorrectMethodsNoUser(done) {
      try {
        const CreateUsage = require(createDetailedUserUsagePath);
        const createUsage = new CreateUsage(sequelizeMock);

        const createArgs = {
          usageEntries: [
            {
              username: 'foobar',
              usageTime: new Date(),
              bytesDownloaded: 1234,
              bytesUploaded: 4321,
            },
          ],
          apiUserId: 1,
        };

        const usernames = [
          'foobar',
        ];

        sinon.spy(createUsage.userRepo, 'getByUsernames');
        sinon.spy(createUsage, 'createUsers');

        createUsage.checkUsernames(usernames, createArgs,
          function checkUsernamesCallback(error) {
            try {
              assert.isUndefined(error);
              assert.equal(createUsage.userRepo.getByUsernames.calledOnce, true);
              assert.equal(createUsage.createUsers.calledOnce, true);

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });

    it('Calls the correct methods if username exists', function CallsCorrectMethodsWithUser(done) {
      try {
        const CreateUsage = require(createDetailedUserUsagePath);
        const createUsage = new CreateUsage(sequelizeMock);
        const createArgs = {
          usageEntries: [
            {
              username: sequelizeMock.User._defaults.username,
              usageTime: new Date(),
              bytesDownloaded: 1234,
              bytesUploaded: 4321,
            },
          ],
          apiUserId: 1,
        };

        const usernames = [
          sequelizeMock.User._defaults.username,
        ];

        sinon.spy(createUsage.userRepo, 'getByUsernames');
        sinon.spy(createUsage, 'createUsers');
        sinon.spy(createUsage, 'createUsages');

        createUsage.checkUsernames(usernames, createArgs,
          function checkUsernamesCallback(error) {
            try {
              assert.isUndefined(error);
              assert.equal(createUsage.userRepo.getByUsernames.calledOnce, true);
              assert.equal(createUsage.createUsers.calledOnce, false);
              assert.equal(createUsage.createUsages.calledOnce, true);

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });
  });

  describe('CreateUsers', function CreateUsers() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      try {
        const CreateUsage = require(createDetailedUserUsagePath);
        const createUsage = new CreateUsage(sequelizeMock);

        const createArgs = {
          usageEntries: [
            {
              username: 'foobar',
              usageTime: new Date(),
              bytesDownloaded: 1234,
              bytesUploaded: 4321,
            },
            {
              username: 'barfoo',
              usageTime: new Date(),
              bytesDownloaded: 9876,
              bytesUploaded: 6789,
            },
          ],
          apiUserId: 1,
        };

        const usernames = [
          'barfoo',
          'foobar',
        ];

        sinon.spy(createUsage.userRepo, 'create');

        createUsage.createUsers(usernames, [], createArgs,
          function createCallback(error) {
            try {
              assert.isUndefined(error);
              assert.equal(createUsage.userRepo.create.called, true);
              assert.equal(createUsage.userRepo.create.callCount, 2);

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });
  });

  describe('CreateUsages', function CreateUsages() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      try {
        const CreateUsage = require(createDetailedUserUsagePath);
        const createUsage = new CreateUsage(sequelizeMock);

        const createArgs = {
          usageEntries: [
            {
              username: 'foobar',
              usageTime: new Date(),
              bytesDownloaded: 1234,
              bytesUploaded: 4321,
            },
            {
              username: 'barfoo',
              usageTime: new Date(),
              bytesDownloaded: 9876,
              bytesUploaded: 6789,
            },
          ],
          apiUserId: 1,
        };

        const fakeModel = sequelizeMock.User._defaults;

        const user1 = JSON.parse(JSON.stringify(fakeModel));
        user1.id = 1;
        user1.username = 'foobar';

        const user2 = JSON.parse(JSON.stringify(fakeModel));
        user2.id = 2;
        user2.username = 'barfoo';

        const users = [
          user1,
          user2,
        ];

        sinon.spy(createUsage, 'getUsernameLookupInfo');
        sinon.spy(createUsage.detailedUserUsageRepo, 'createMany');

        createUsage.createUsages(users, createArgs,
          function createCallback(error) {
            try {
              assert.isUndefined(error);
              assert.equal(createUsage.getUsernameLookupInfo.calledOnce, true);
              assert.equal(createUsage.detailedUserUsageRepo.createMany.calledOnce, true);

              done();
            } catch (innerError) {
              done(innerError);
            }
          });
      } catch (error) {
        done(error);
      }
    });
  });

  describe('GetUsernameLookupInfo', function GetUsernameLookupInfo() {
    it('Returns correct information', function ReturnCorrectInfo() {
      const CreateUsage = require(createDetailedUserUsagePath);
      const createUsage = new CreateUsage(sequelizeMock);

      const fakeModel = sequelizeMock.User._defaults;

      const user1 = JSON.parse(JSON.stringify(fakeModel));
      user1.id = 1;
      user1.username = 'foobar';

      const user2 = JSON.parse(JSON.stringify(fakeModel));
      user2.id = 2;
      user2.username = 'barfoo';

      const users = [
        user1,
        user2,
      ];

      const usernameLookupInfo = createUsage.getUsernameLookupInfo(users);

      assert.lengthOf(Object.keys(usernameLookupInfo), users.length);
      assert.include(Object.keys(usernameLookupInfo), user1.username);
      assert.equal(usernameLookupInfo[user1.username], user1.id);
      assert.include(Object.keys(usernameLookupInfo), user2.username);
      assert.equal(usernameLookupInfo[user2.username], user2.id);
    });
  });
});
