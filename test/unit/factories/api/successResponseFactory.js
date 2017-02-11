'use strict';

const chai = require('chai');
const path = require('path');
const fs = require('fs');

const assert = chai.assert;
const successResponseFactoryPath = path.join(__dirname, '..', '..', '..', '..', 'factories', 'api', 'successResponseFactory.js');
const SuccessResponseFactoryClass = require(successResponseFactoryPath);

describe('SuccessResponseFactory', function SuccessResponseFactory() {
  describe('Models', function Models() {
    it('Has correct models set', function HasCorrectModels() {
      const errorResponseFactory = new SuccessResponseFactoryClass();

      assert.property(errorResponseFactory, 'models');
      assert.lengthOf(Object.keys(errorResponseFactory.models), 1);
      assert.include(Object.keys(errorResponseFactory.models), 'SuccessResponseModel');
    });
  });

  describe('ParseResponse', function ParseResponse() {
    it('Returns the correct schema if no args are specified', function ReturnsCorrectSchemaNoArgs() {
      const errorResponseFactory = new SuccessResponseFactoryClass();
      const Validator = require('jsonschema').Validator;

      const modelValidator = new Validator();

      const parseResult = errorResponseFactory.parseResponse();

      const successResponseSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'successResponse.json')));
      const successResponseMetaSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'successResponseMeta.json')));
      const successResponsePaginationSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'successResponsePagination.json')));

      modelValidator.addSchema(successResponseMetaSchema, '/SuccessResponseMeta');
      modelValidator.addSchema(successResponsePaginationSchema, '/SuccessResponsePagination');

      const validationResult = modelValidator.validate(parseResult, successResponseSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if no args are specified', function ReturnsCorrectDataNoArgs() {
      const errorResponseFactory = new SuccessResponseFactoryClass();

      const parseResult = errorResponseFactory.parseResponse();

      assert.lengthOf(Object.keys(parseResult), 1);
      assert.property(parseResult, 'meta');

      assert.lengthOf(Object.keys(parseResult.meta), 1);
      assert.property(parseResult.meta, 'code');
    });

    it('Returns the correct schema if args is specified', function ReturnsCorrectSchemaArgs() {
      const errorResponseFactory = new SuccessResponseFactoryClass();
      const Validator = require('jsonschema').Validator;

      const modelValidator = new Validator();
      const args = {
        data: {
          foobar: 'barfoo',
        },
        pagination: {
          count: 10,
          page: 2,
          totalResponses: 50,
          totalPages: 5,
        },
        meta: {
          metafoobar: 'barfoometa',
        },
        statusCode: 1234,
        startDate: new Date(),
        endDate: new Date(Date.now() + 10000),
      };

      const parseResult = errorResponseFactory.parseResponse(args);

      const successResponseSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'successResponse.json')));
      const successResponseMetaSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'successResponseMeta.json')));
      const successResponsePaginationSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'models', 'api', 'schema', 'successResponsePagination.json')));

      modelValidator.addSchema(successResponseMetaSchema, '/SuccessResponseMeta');
      modelValidator.addSchema(successResponsePaginationSchema, '/SuccessResponsePagination');

      const validationResult = modelValidator.validate(parseResult, successResponseSchema);
      assert.lengthOf(validationResult.errors, 0);
    });

    it('Returns the correct data if args is specified', function ReturnsCorrectDataArgs() {
      const errorResponseFactory = new SuccessResponseFactoryClass();
      const args = {
        data: {
          foobar: 'barfoo',
        },
        pagination: {
          count: 10,
          page: 2,
          totalResponses: 50,
          totalPages: 5,
        },
        meta: {
          metafoobar: 'barfoometa',
        },
        statusCode: 1234,
        startDate: new Date(),
        endDate: new Date(Date.now() + 10000),
      };

      const parseResult = errorResponseFactory.parseResponse(args);

      assert.lengthOf(Object.keys(parseResult), 3);
      assert.property(parseResult, 'meta');
      assert.property(parseResult, 'data');
      assert.property(parseResult, 'pagination');

      assert.lengthOf(Object.keys(parseResult.meta), 3);
      assert.property(parseResult.meta, 'code');
      assert.property(parseResult.meta, 'metafoobar');
      assert.property(parseResult.meta, 'requestTime');

      assert.equal(parseResult.meta.code, args.statusCode);
      assert.equal(parseResult.meta.metafoobar, args.meta.metafoobar);
      assert.equal(parseResult.meta.requestTime,
        (args.endDate.getTime() - args.startDate.getTime()));

      assert.lengthOf(Object.keys(parseResult.data), 1);
      assert.property(parseResult.data, 'foobar');
      assert.equal(parseResult.data.foobar, 'barfoo');

      assert.lengthOf(Object.keys(parseResult.pagination), 4);
      assert.property(parseResult.pagination, 'count');
      assert.property(parseResult.pagination, 'page');
      assert.property(parseResult.pagination, 'totalResponses');
      assert.property(parseResult.pagination, 'totalPages');

      assert.equal(parseResult.pagination.count, args.pagination.count);
      assert.equal(parseResult.pagination.page, args.pagination.page);
      assert.equal(parseResult.pagination.totalResponses, args.pagination.totalResponses);
      assert.equal(parseResult.pagination.totalPages, args.pagination.totalPages);
    });
  });
});
