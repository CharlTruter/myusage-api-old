'use strict';

const chai = require('chai');
const path = require('path');

const assert = chai.assert;
const validationHelperPath = path.join(__dirname, '..', '..', '..', '..', 'businessLogic', 'validation', 'validationHelper.js');
const ValidationHelperClass = require(validationHelperPath);

describe('ValidationHelper', function ValidationHelper() {
  describe('IsNonNegativeInteger', function IsNonNegativeInteger() {
    it('Returns true if valid value is passed', function ValidValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isNonNegativeInteger(10);

      assert.equal(response, true);
    });

    it('Returns false if string is passed', function StringValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isNonNegativeInteger('foobar');

      assert.equal(response, false);
    });

    it('Returns false if negative number is passed', function NegativeNumber() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isNonNegativeInteger(-10);

      assert.equal(response, false);
    });

    it('Returns false if float is passed', function FloatValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isNonNegativeInteger(10.5);

      assert.equal(response, false);
    });

    it('Returns false if empty string is passed', function EmptyString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isNonNegativeInteger('');

      assert.equal(response, false);
    });

    it('Returns false if null is passed', function NullValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isNonNegativeInteger(null);

      assert.equal(response, false);
    });
  });

  describe('IsValidDate', function IsValidDate() {
    it('Should return true if valid date passed', function ValidDate() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidDate('Tue Feb 21 2017 20:17:22');

      assert.equal(response, true);
    });

    it('Should return false if invalid date passed', function InvalidDate() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidDate('foobar');

      assert.equal(response, false);
    });
  });

  describe('IsValidString', function IsValidString() {
    it('Should return true if string passed', function ValidString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidString('foobar');

      assert.equal(response, true);
    });

    it('Should return false if non-string passed', function NonString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidString(10);

      assert.equal(response, false);
    });

    it('Should return false if null passed', function NullValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidString(null);

      assert.equal(response, false);
    });
  });

  describe('IsWhitespaceOrEmptyString', function IsWhitespaceOrEmptyString() {
    it('Should return true if empty string is passed', function EmptyString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isWhitespaceOrEmptyString('');

      assert.equal(response, true);
    });

    it('Should return true if whitespace string is passed', function WhitespaceString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isWhitespaceOrEmptyString('   ');

      assert.equal(response, true);
    });

    it('Should return false if non-empty string passed', function NonEmptyString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isWhitespaceOrEmptyString('foobar');

      assert.equal(response, false);
    });

    it('should return false if null passed', function NullValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isWhitespaceOrEmptyString(null);

      assert.equal(response, false);
    });
  });

  describe('IsValidEmail', function IsValidEmail() {
    it('Returns true if valid email is passed', function ValidEmail() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidEmail('foobar@barfoo.com');

      assert.equal(response, true);
    });

    it('Returns false if invalid email is passed', function InvalidEmail() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidEmail('foobar');

      assert.equal(response, false);
    });

    it('Returns false if empty string is passed', function EmptyString() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidEmail('');

      assert.equal(response, false);
    });

    it('Returns false if null is passed', function NullEmail() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidEmail(null);

      assert.equal(response, false);
    });
  });

  describe('IsValidBoolean', function IsValidBoolean() {
    it('Should return true if true is passed', function TrueValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidBoolean(true);

      assert.equal(response, true);
    });

    it('Should return true if false is passed', function FalseValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidBoolean(false);

      assert.equal(response, true);
    });

    it('Should return false if non boolean value passed', function NonBooleanValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidBoolean('foobar');

      assert.equal(response, false);
    });

    it('should return false if null passed', function NullValue() {
      const validationHelper = new ValidationHelperClass();

      const response = validationHelper.isValidBoolean(null);

      assert.equal(response, false);
    });
  });
});
