'use strict';

const chai = require('chai');
const path = require('path');
const fs = require('fs');

const assert = chai.assert;
const errorResponseFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'api', 'errorResponseFactory.js');
const ErrorResponseFactoryClass = require(errorResponseFactoryPath);

describe('ErrorResponseFactory', function ErrorResponseFactory() {
  describe('Models', function Models() {
    it('Has correct models set', function HasCorrectModels() {
      const errorResponseFactory = new ErrorResponseFactoryClass();

      assert.property(errorResponseFactory, 'models');
      assert.lengthOf(Object.keys(errorResponseFactory.models), 1);
      assert.include(Object.keys(errorResponseFactory.models), 'ErrorResponseModel');
    });
  });

  describe('ParseResponse', function ParseResponse() {
    it('Returns the correct schema if no args are specified', function ReturnsCorrectSchemaNoArgs() {
      const errorResponseFactory = new ErrorResponseFactoryClass();
      const Validator = require('jsonschema').Validator;

      const modelValidator = new Validator();

      const parseResult = errorResponseFactory.parseResponse();

      const errorResponseSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'errorResponse.json')));
      const errorResponseMetaSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'errorResponseMeta.json')));

      modelValidator.addSchema(errorResponseMetaSchema, '/ErrorResponseMeta');

      const validationResult = modelValidator.validate(parseResult, errorResponseSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if no args are specified', function ReturnsCorrectDataNoArgs() {
      const errorResponseFactory = new ErrorResponseFactoryClass();

      const parseResult = errorResponseFactory.parseResponse();

      assert.lengthOf(Object.keys(parseResult), 1);
      assert.property(parseResult, 'meta');

      assert.lengthOf(Object.keys(parseResult.meta), 3);
      assert.property(parseResult.meta, 'errorType');
      assert.property(parseResult.meta, 'errorMessage');
      assert.property(parseResult.meta, 'errorCode');

      assert.equal(parseResult.meta.errorType, 'Unknown');
      assert.isNull(parseResult.meta.errorMessage);
      assert.equal(parseResult.meta.errorCode, 500);
    });

    it('Returns the correct schema if args are specified', function ReturnsCorrectSchemaArgs() {
      const errorResponseFactory = new ErrorResponseFactoryClass();
      const Validator = require('jsonschema').Validator;

      const modelValidator = new Validator();
      const args = {
        errorType: 'foobar',
        errorMessage: 'barfoo',
        startDate: new Date(),
        endDate: new Date(Date.now() + 10000),
      };

      const parseResult = errorResponseFactory.parseResponse(args);

      const errorResponseSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'errorResponse.json')));
      const errorResponseMetaSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'errorResponseMeta.json')));

      modelValidator.addSchema(errorResponseMetaSchema, '/ErrorResponseMeta');

      const validationResult = modelValidator.validate(parseResult, errorResponseSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if args are specified', function ReturnsCorrectDataArgs() {
      const errorResponseFactory = new ErrorResponseFactoryClass();
      const args = {
        errorType: 'foobar',
        errorMessage: 'barfoo',
        startDate: new Date(),
        endDate: new Date(Date.now() + 10000),
      };

      const parseResult = errorResponseFactory.parseResponse(args);

      assert.lengthOf(Object.keys(parseResult), 1);
      assert.property(parseResult, 'meta');

      assert.lengthOf(Object.keys(parseResult.meta), 4);
      assert.property(parseResult.meta, 'errorType');
      assert.property(parseResult.meta, 'errorMessage');
      assert.property(parseResult.meta, 'errorCode');
      assert.property(parseResult.meta, 'requestTime');

      assert.equal(parseResult.meta.errorType, args.errorType);
      assert.equal(parseResult.meta.errorMessage, args.errorMessage);
      assert.equal(parseResult.meta.errorCode, 500);
      assert.equal(parseResult.meta.requestTime,
        (args.endDate.getTime() - args.startDate.getTime()));
    });
  });
});
