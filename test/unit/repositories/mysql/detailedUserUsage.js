'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const SequelizeMock = require(path.join(__dirname, '..', '..', '..', 'sequelizeMock', 'sequelizeMock.js'));
const sequelizeMock = new SequelizeMock();
const assert = chai.assert;
const detailedUserUsageRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'mysql', 'detailedUserUsage.js');

describe('MysqlDetailedUserUsageRepository', function MysqlDetailedUserUsageRepository() {
  describe('Create', function Create() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      const DetailedUserUsageRepo = require(detailedUserUsageRepoPath);
      const detailedUserUsageRepo = new DetailedUserUsageRepo(sequelizeMock);
      sinon.spy(detailedUserUsageRepo.detailedUserUsageFactory, 'parseRow');

      const createArgs = {
        id: 1,
        user_id: 2,
        usage_time: new Date(),
        bytes_downloaded: 1234,
        bytes_uploaded: 4321,
        created_at: new Date(),
        updated_at: new Date(),
      };

      detailedUserUsageRepo.create(createArgs, function createCallback(error, response) {
        try {
          assert.isNull(error);
          assert.isDefined(response);
          assert.equal(detailedUserUsageRepo.detailedUserUsageFactory.parseRow.calledOnce, true);
          detailedUserUsageRepo.detailedUserUsageFactory.parseRow.restore();
          return done();
        } catch (innerError) {
          detailedUserUsageRepo.detailedUserUsageFactory.parseRow.restore();
          return done(innerError);
        }
      });
    });
  });
});
