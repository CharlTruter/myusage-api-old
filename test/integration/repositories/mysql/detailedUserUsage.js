'use strict';

const chai = require('chai');
const path = require('path');
const jsonSchema = require('jsonschema');
const fs = require('fs');

const SequelizeHelper = require(path.join(__dirname, '..', '..', '..', 'sequelizeHelper', 'sequelizeHelper.js'));
const assert = chai.assert;
const sequelizeHelper = new SequelizeHelper();
const detailedUserUsageRepoPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'mysql', 'detailedUserUsage.js');

describe('MysqlDetailedUserUsageRepository', function MysqlDetailedUserUsageRepository() {
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

  describe('Create', function Create() {
    it('Returns the correct schema', function CorrectSchema(done) {
      const DetailerUserUsageRepo = require(detailedUserUsageRepoPath);
      const detailerUserUsageRepo = new DetailerUserUsageRepo(sequelizeHelper.sequelize);

      const createArgs = {
        userId: 2,
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      detailerUserUsageRepo.create(createArgs, function createCallback(createError, response) {
        try {
          assert.isNull(createError);
          const validator = new jsonSchema.Validator();
          const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'detailedUserUsage.json'), 'utf8'));

          const validationResult = validator.validate(response, userSchema);
          assert.lengthOf(validationResult.errors, 0);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns the correct data for the entry', function CorrectData(done) {
      const DetailerUserUsageRepo = require(detailedUserUsageRepoPath);
      const detailerUserUsageRepo = new DetailerUserUsageRepo(sequelizeHelper.sequelize);
      const dateFormat = require('date-format');

      const createArgs = {
        userId: 2,
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      detailerUserUsageRepo.create(createArgs, function createCallback(createError, response) {
        try {
          assert.isNull(createError);
          assert.equal(response.userId, createArgs.userId);
          assert.equal(response.usageTime, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', createArgs.usageTime));
          assert.equal(response.bytesDownloaded, createArgs.bytesDownloaded);
          assert.equal(response.bytesUploaded, createArgs.bytesUploaded);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Creates the data in the database', function IdNull(done) {
      const DetailerUserUsageRepo = require(detailedUserUsageRepoPath);
      const detailerUserUsageRepo = new DetailerUserUsageRepo(sequelizeHelper.sequelize);
      const dateFormat = require('date-format');

      const createArgs = {
        userId: 2,
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      sequelizeHelper.sequelize.DetailedUserUsage.findAll({
        limit: 1,
        where: {
          user_id: createArgs.userId,
          usage_time: createArgs.usageTime,
        },
      }).then(function findAllCallback(usages) {
        assert.lengthOf(usages, 0);

        detailerUserUsageRepo.create(createArgs, function createCallback(error, response) {
          try {
            assert.isNull(error);
            assert.isDefined(response);
            return sequelizeHelper.sequelize.DetailedUserUsage.findAll({
              limit: 1,
              where: {
                user_id: createArgs.userId,
                usage_time: createArgs.usageTime,
              },
            }).then(function findAllInnerCallback(afterCreateUsage) {
              assert.lengthOf(afterCreateUsage, 1);
              const usage = afterCreateUsage[0].get();
              assert.equal(usage.user_id, createArgs.userId);
              assert.equal(dateFormat('yyyy-MM-dd hh:mm:ss:SSS', usage.usage_time), dateFormat('yyyy-MM-dd hh:mm:ss:000', createArgs.usageTime));
              assert.equal(usage.bytes_downloaded, createArgs.bytesDownloaded);
              assert.equal(usage.bytes_uploaded, createArgs.bytesUploaded);
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

  describe('CreateMany', function Create() {
    it('Returns no information', function ReturnsNoInfo(done) {
      const DetailerUserUsageRepo = require(detailedUserUsageRepoPath);
      const detailerUserUsageRepo = new DetailerUserUsageRepo(sequelizeHelper.sequelize);

      const createArgs = [
        {
          userId: 2,
          usageTime: new Date(),
          bytesDownloaded: 1234,
          bytesUploaded: 4321,
        }, {
          userId: 3,
          usageTime: new Date(),
          bytesDownloaded: 9876,
          bytesUploaded: 6789,
        },
      ];

      detailerUserUsageRepo.createMany(createArgs, function createCallback(createError, response) {
        try {
          assert.isUndefined(createError);
          assert.isUndefined(response);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Creates the data in the database', function IdNull(done) {
      const DetailerUserUsageRepo = require(detailedUserUsageRepoPath);
      const detailerUserUsageRepo = new DetailerUserUsageRepo(sequelizeHelper.sequelize);
      const dateFormat = require('date-format');

      const createArgs = [
        {
          userId: 2,
          usageTime: new Date(),
          bytesDownloaded: 1234,
          bytesUploaded: 4321,
        }, {
          userId: 3,
          usageTime: new Date(),
          bytesDownloaded: 9876,
          bytesUploaded: 6789,
        },
      ];

      sequelizeHelper.sequelize.DetailedUserUsage.findAll({
        limit: 10,
      }).then(function findAllCallback(usages) {
        assert.lengthOf(usages, 0);

        detailerUserUsageRepo.createMany(createArgs, function createCallback(error) {
          try {
            assert.isUndefined(error);
            return sequelizeHelper.sequelize.DetailedUserUsage.findAll({
              limit: 10,
            }).then(function findAllInnerCallback(afterCreateUsage) {
              assert.lengthOf(afterCreateUsage, 2);

              let usage = afterCreateUsage[0].get();
              assert.equal(usage.user_id, createArgs[0].userId);
              assert.equal(dateFormat('yyyy-MM-dd hh:mm:ss:SSS', usage.usage_time), dateFormat('yyyy-MM-dd hh:mm:ss:000', createArgs[0].usageTime));
              assert.equal(usage.bytes_downloaded, createArgs[0].bytesDownloaded);
              assert.equal(usage.bytes_uploaded, createArgs[0].bytesUploaded);

              usage = afterCreateUsage[1].get();
              assert.equal(usage.user_id, createArgs[1].userId);
              assert.equal(dateFormat('yyyy-MM-dd hh:mm:ss:SSS', usage.usage_time), dateFormat('yyyy-MM-dd hh:mm:ss:000', createArgs[1].usageTime));
              assert.equal(usage.bytes_downloaded, createArgs[1].bytesDownloaded);
              assert.equal(usage.bytes_uploaded, createArgs[1].bytesUploaded);
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
