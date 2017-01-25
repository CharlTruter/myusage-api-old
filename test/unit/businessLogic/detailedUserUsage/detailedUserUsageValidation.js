'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const assert = chai.assert;
const detailedUserUsageValidationPath = path.join(__dirname, '..', '..', '..', '..', 'businessLogic', 'detailedUserUsage', 'detailedUserUsageValidation.js');
const SequelizeMock = require(path.join(__dirname, '..', '..', '..', 'sequelizeMock', 'sequelizeMock.js'));
const sequelizeMock = new SequelizeMock();

describe('DetailedUserUsageValidation', function DetailedUserUsageValidation() {
  describe('ValidateCreateDetailedUserUsage', function ValidateCreateDetailedUserUsage() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      try {
        const UsageValidation = require(detailedUserUsageValidationPath);
        const usageValidation = new UsageValidation(sequelizeMock);

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

        sinon.spy(usageValidation, 'validateSingleDetailedUserUsage');
        sinon.spy(usageValidation, 'checkApiUserId');

        usageValidation.validateCreateDetailedUserUsage(createArgs,
          function validateCreateDetailedUserUsageCallback(error) {
            try {
              assert.isUndefined(error);
              assert.equal(usageValidation.validateSingleDetailedUserUsage.called, true);
              assert.equal(usageValidation.checkApiUserId.calledOnce, true);

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

  describe('ValidateSingleDetailedUserUsage', function ValidateSingleDetailedUserUsage() {
    it('Returns no error with proper args', function ProperArgs() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      usageValidation.validateSingleDetailedUserUsage(createArgs);
    });

    it('Returns error if non-string username is specified', function NonStringUsername() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 123,
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Non-string username has been specified.');
      }
    });

    it('Returns error if no username is specified', function NoUsername() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Non-string username has been specified.');
      }
    });

    it('Returns error if blank username is specified', function BlankUsername() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: '',
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Blank username is specified.');
      }
    });

    it('Returns error if whitespace username is specified', function WhitespaceUsername() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: '   ',
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Blank username is specified.');
      }
    });

    it('Returns error if no bytes downloaded is specified', function NoBytesDownloaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes downloaded must be a non-negative integer');
      }
    });

    it('Returns error if negative bytes downloaded is specified', function NegativeBytesDownloaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: -1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes downloaded must be a non-negative integer');
      }
    });

    it('Returns error if float bytes downloaded is specified', function FloatBytesDownloaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: 1234.5,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes downloaded must be a non-negative integer');
      }
    });

    it('Returns error if string bytes downloaded is specified', function StringBytesDownloaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: '1234',
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes downloaded must be a non-negative integer');
      }
    });

    it('Returns error if no bytes uploaded is specified', function NoBytesUploaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: 1234,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes uploaded must be a non-negative integer');
      }
    });

    it('Returns error if negative bytes uploaded is specified', function NegativeBytesUploaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: -4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes uploaded must be a non-negative integer');
      }
    });

    it('Returns error if float bytes uploaded is specified', function FloatBytesUploaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: 4321.5,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes uploaded must be a non-negative integer');
      }
    });

    it('Returns error if string bytes uploaded is specified', function StringBytesUploaded() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: new Date(),
        bytesDownloaded: 1234,
        bytesUploaded: '4321',
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Bytes uploaded must be a non-negative integer');
      }
    });

    it('Returns error if no usage time is specified', function NoUsageTime() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Usage time must be a valid date');
      }
    });

    it('Returns error if invalid date usage time is specified', function InvalidUsageTime() {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      const createArgs = {
        username: 'foobar',
        usageTime: 'foobar',
        bytesDownloaded: 1234,
        bytesUploaded: 4321,
      };

      try {
        usageValidation.validateSingleDetailedUserUsage(createArgs);
        throw new Error('No error thrown.');
      } catch (error) {
        assert.equal(error.message, 'Usage time must be a valid date');
      }
    });
  });

  describe('CheckApiUserId', function CheckApiUserId() {
    it('Returns no error if api user exists', function ApiUserExists(done) {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const usageValidation = new UsageValidation(sequelizeMock);

      usageValidation.checkApiUserId(1, function checkApiUserIdCallback(error) {
        try {
          assert.isUndefined(error);
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });

    it('Returns an error if api user does not exist', function ApiUserNotExists(done) {
      const UsageValidation = require(detailedUserUsageValidationPath);
      const sequelizeMockNoValues = new SequelizeMock(true);
      const usageValidation = new UsageValidation(sequelizeMockNoValues);

      usageValidation.checkApiUserId(1, function checkApiUserIdCallback(error) {
        try {
          assert.isDefined(error);
          assert.equal(error.message, 'Api user 1 does not exist.');
          done();
        } catch (innerError) {
          done(innerError);
        }
      });
    });
  });
});
