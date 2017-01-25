'use strict';

const chai = require('chai');
const path = require('path');

const assert = chai.assert;
const detailedUserUsageFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'mysql', 'detailedUserUsage.js');
const sequelizePath = path.join(__dirname, '..', '..', '..', '..', 'sequelize', 'models');

const sequelize = require(sequelizePath);

const getDetailedUserUsage = function getUsage() {
  return sequelize.DetailedUserUsage.build({
    id: 1,
    user_id: 20,
    usage_time: new Date(),
    bytes_downloaded: 1234,
    bytes_uploaded: 9876,
    created_at: new Date(),
    updated_at: new Date(),
  }).get();
};

describe('MysqlDetailedUserUsageFactory', function MysqlDetailedUserUsageFactory() {
  describe('Models', function Models() {
    it('Has correct models set', function HasCorrectModels() {
      const detailedUserUsageFactory = require(detailedUserUsageFactoryPath);

      assert.property(detailedUserUsageFactory, 'models');
      assert.lengthOf(Object.keys(detailedUserUsageFactory.models), 1);
      assert.include(Object.keys(detailedUserUsageFactory.models), 'DetailedUserUsageModel');
    });
  });

  describe('ParseRow', function ParseRow() {
    it('Returns null if no row is specified', function NoRowSpecified() {
      const detailedUserUsageFactory = require(detailedUserUsageFactoryPath);

      const parseResult = detailedUserUsageFactory.parseRow();
      assert.isNull(parseResult);
    });

    it('Returns the correct schema if a row is specified', function ReturnsCorrectSchema() {
      const detailedUserUsageFactory = require(detailedUserUsageFactoryPath);
      const Validator = require('jsonschema').Validator;
      const fs = require('fs');

      const modelValidator = new Validator();
      const detailedUserUsage = getDetailedUserUsage();

      const parseResult = detailedUserUsageFactory.parseRow(detailedUserUsage);

      const detailedUserUsageSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'detailedUserUsage.json')));

      const validationResult = modelValidator.validate(parseResult, detailedUserUsageSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if a row is specified', function ReturnsCorrectSchema() {
      const detailedUserUsageFactory = require(detailedUserUsageFactoryPath);
      const dateFormat = require('date-format');

      const detailedUserUsage = getDetailedUserUsage();

      const parseResult = detailedUserUsageFactory.parseRow(detailedUserUsage);

      assert.equal(parseResult.id, detailedUserUsage.id);
      assert.equal(parseResult.userId, detailedUserUsage.user_id);
      assert.equal(parseResult.usageTime, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', detailedUserUsage.usage_time));
      assert.equal(parseResult.bytesDownloaded, detailedUserUsage.bytes_downloaded);
      assert.equal(parseResult.bytesUploaded, detailedUserUsage.bytes_uploaded);
      assert.equal(parseResult.createdAt, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', detailedUserUsage.created_at));
      assert.equal(parseResult.updatedAt, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', detailedUserUsage.updated_at));
    });
  });
});
