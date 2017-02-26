'use strict';

const chai = require('chai');
const path = require('path');
const fs = require('fs');

const assert = chai.assert;
const apiKeyFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'aws', 'apiKeyFactory.js');
const ApiKeyFactoryClass = require(apiKeyFactoryPath);

const getApiKeyResult = function getApiKeyResult() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'testData', 'aws', 'apiKey', 'singleKey.json'), 'utf8'));
};

describe('ApiKeyFactory', function ApiKeyFactory() {
  describe('Models', function Models() {
    it('Has correct models set', function HasCorrectModels() {
      const apiKeyFactory = new ApiKeyFactoryClass();

      assert.property(apiKeyFactory, 'models');
      assert.lengthOf(Object.keys(apiKeyFactory.models), 1);
      assert.include(Object.keys(apiKeyFactory.models), 'ApiKeyModel');
    });
  });

  describe('ParseResult', function ParseResult() {
    it('Returns null if no result is passed', function NoResult() {
      const apiKeyFactory = new ApiKeyFactoryClass();

      const parseResult = apiKeyFactory.parseResult();
      assert.isNull(parseResult);
    });

    it('Returns the correct schema if a result is specified', function ReturnsCorrectSchema() {
      const apiKeyFactory = new ApiKeyFactoryClass();
      const Validator = require('jsonschema').Validator;

      const modelValidator = new Validator();
      const result = getApiKeyResult();

      const parseResult = apiKeyFactory.parseResult(result);

      const apiKeySchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'aws', 'schema', 'apiKey.json')));

      const validationResult = modelValidator.validate(parseResult, apiKeySchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if a result is specified', function ReturnsCorrectData() {
      const apiKeyFactory = new ApiKeyFactoryClass();

      const result = getApiKeyResult();

      const parseResult = apiKeyFactory.parseResult(result);

      assert.equal(parseResult.id, result.id);
      assert.equal(parseResult.value, result.value);
      assert.equal(parseResult.name, result.name);
      assert.equal(parseResult.description, result.description);
      assert.equal(parseResult.enabled, result.enabled);
      assert.equal(parseResult.createdAt, result.createdDate);
      assert.equal(parseResult.updatedAt, result.lastUpdatedDate);
    });
  });
});
