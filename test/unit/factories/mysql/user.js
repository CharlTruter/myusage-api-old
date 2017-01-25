'use strict';

const chai = require('chai');
const path = require('path');

const assert = chai.assert;
const userFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'mysql', 'user.js');
const sequelizePath = path.join(__dirname, '..', '..', '..', '..', 'sequelize', 'models');

const sequelize = require(sequelizePath);

const getUser = function GetUser() {
  return sequelize.User.build({
    id: 1,
    username: 'SomeUsername',
    display_name: 'This is a username',
    api_user_id: 10,
    created_at: new Date(),
    updated_at: new Date(),
  }).get();
};

describe('MysqlUserFactory', function MysqlUserFactory() {
  describe('Models', function Models() {
    it('Has correct models set', function HasCorrectModels() {
      const userFactory = require(userFactoryPath);

      assert.property(userFactory, 'models');
      assert.lengthOf(Object.keys(userFactory.models), 1);
      assert.include(Object.keys(userFactory.models), 'UserModel');
    });
  });

  describe('ParseRow', function ParseRow() {
    it('Returns null if no row is specified', function NoRowSpecified() {
      const userFactory = require(userFactoryPath);

      const parseResult = userFactory.parseRow();
      assert.isNull(parseResult);
    });

    it('Returns the correct schema if a row is specified', function ReturnsCorrectSchema() {
      const userFactory = require(userFactoryPath);
      const Validator = require('jsonschema').Validator;
      const fs = require('fs');

      const modelValidator = new Validator();
      const user = getUser();

      const parseResult = userFactory.parseRow(user);

      const userSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'mysql', 'schema', 'user.json')));

      const validationResult = modelValidator.validate(parseResult, userSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if a row is specified', function ReturnsCorrectSchema() {
      const userFactory = require(userFactoryPath);
      const dateFormat = require('date-format');

      const user = getUser();

      const parseResult = userFactory.parseRow(user);

      assert.equal(parseResult.id, user.id);
      assert.equal(parseResult.username, user.username);
      assert.equal(parseResult.displayName, user.display_name);
      assert.equal(parseResult.apiUserId, user.api_user_id);
      assert.equal(parseResult.createdAt, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', user.created_at));
      assert.equal(parseResult.updatedAt, dateFormat('yyyy-MM-dd hh:mm:ss:SSS', user.updated_at));
    });
  });
});
