'use strict';

module.exports = {
  isNonNegativeInteger: function isNonNegativeInteger(value) {
    return !isNaN(value) &&
      parseInt(Number(value), 10) === value &&
      !isNaN(parseInt(value, 10)) &&
      parseInt(Number(value), 10) >= 0;
  },

  isValidDate: function isValidDate(value) {
    try {
      return value && !isNaN(Date.parse(value));
    } catch (error) {
      return false;
    }
  },

  isValidString: function isValidString(value) {
    return typeof value === 'string';
  },

  isWhitespaceOrEmptyString: function isWhitespaceOrEmptyString(value) {
    return value.toString().trim().length === 0;
  },
};
