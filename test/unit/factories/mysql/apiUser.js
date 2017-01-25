'use strict';

const chai = require('chai');
const path = require('path');

const assert = chai.assert;
const apiUserFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'mysql', 'apiUser.js');
const sequelizePath = path.join(__dirname, '..', '..', '..', '..', 'sequelize', 'models');

const sequelize = require(sequelizePath);

const getApiUser = function getApiUser() {
  return sequelize.ApiUser.build({
    id: 1,
    first_name: 'John',
    last_name: 'Smith',
    email_address: 'foo@bar.com',
    password_hash: 'PASSWORDHASH',
    api_access: 1,
    website_access: 1,
    api_key: 'APIKEY',
    created_at: new Date(),
    updated_at: new Date(),
  }).get();
};

describe('MysqlApiUserFactory', function MysqlApiUserFactoryTest() {
  describe('Models', function Models() {
    it('Has correct models set', function HasCorrectModels() {
      const apiUserFactory = require(apiUserFactoryPath);

      assert.property(apiUserFactory, 'models');
      assert.lengthOf(Object.keys(apiUserFactory.models), 1);
      assert.include(Object.keys(apiUserFactory.models), 'ApiUserModel');
    });
  });

  describe('ParseRow', function ParseRow() {
    it('Returns null if no row is specified', function NoRowSpecified() {
      const apiUserFactory = require(apiUserFactoryPath);

      const parseResult = apiUserFactory.parseRow();
      assert.isNull(parseResult);
    });

    it('Returns the correct schema if a row is specified', function ReturnsCorrectSchema() {
      const apiUserFactory = require(apiUserFactoryPath);
      const Validator = require('jsonschema').Validator;
      const fs = require('fs');

      const modelValidator = new Validator();
      const apiUser = getApiUser();

      const parseResult = apiUserFactory.parseRow(apiUser);

      const apiUserSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'apiUser.json')));

      const validationResult = modelValidator.validate(parseResult, apiUserSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if a row is specified', function ReturnsCorrectSchema() {
      const apiUserFactory = require(apiUserFactoryPath);
      const dateFormat = require('date-format');

      const apiUser = getApiUser();

      const parseResult = apiUserFactory.parseRow(apiUser);

      assert.equal(parseResult.id, apiUser.id);
      assert.equal(parseResult.firstName, apiUser.first_name);
      assert.equal(parseResult.lastName, apiUser.last_name);
      assert.equal(parseResult.emailAddress, apiUser.email_address);
      assert.equal(parseResult.passwordHash, apiUser.password_hash);
      assert.equal(parseResult.apiAccess, apiUser.api_access);
      assert.equal(parseResult.websiteAccess, apiUser.website_access);
      assert.equal(parseResult.apiKey, apiUser.api_key);
      assert.equal(parseResult.createdAt, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', apiUser.created_at));
      assert.equal(parseResult.updatedAt, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', apiUser.updated_at));
    });
  });
});
