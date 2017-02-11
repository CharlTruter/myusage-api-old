'use strict';

module.exports = function ValidationHelper() {
  this.isNonNegativeInteger = function isNonNegativeInteger(value) {
    return !isNaN(value) &&
      parseInt(Number(value), 10) === value &&
      !isNaN(parseInt(value, 10)) &&
      parseInt(Number(value), 10) >= 0;
  };

  this.isValidDate = function isValidDate(value) {
    try {
      return value && !isNaN(Date.parse(value));
    } catch (error) {
      return false;
    }
  };

  this.isValidString = function isValidString(value) {
    return typeof value === 'string';
  };

  this.isWhitespaceOrEmptyString = function isWhitespaceOrEmptyString(value) {
    return value != null && value.toString().trim().length === 0;
  };

  this.isValidEmail = function isValidEmail(value) {
    const regexGuid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi;
    return regexGuid.test(value);
  };

  this.isValidBoolean = function isValidBoolean(value) {
    return value !== undefined && value != null && (typeof value === 'boolean' ||
      (typeof value === 'object' && typeof value.valueOf() === 'boolean'));
  };
};
