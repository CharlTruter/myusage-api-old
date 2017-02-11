'use strict';

const ValidationHelper = require('../validation/validationHelper.js');

module.exports = function apiUserValidation() {
  this.validationHelper = new ValidationHelper();

  this.validateCreate = function validateCreate(event, callback) {
    let methodEvent = event;

    if (!methodEvent) {
      methodEvent = {};
    }

    try {
      if (!methodEvent['body-json']) {
        throw new Error('No JSON body passed.');
      }

      const jsonBody = methodEvent['body-json'];

      if (!jsonBody.firstName) {
        throw new Error('No first name specified.');
      } else if (this.validationHelper.isWhitespaceOrEmptyString(jsonBody.firstName)) {
        throw new Error('Blank first name specified.');
      }

      if (!jsonBody.lastName) {
        throw new Error('No last name specified.');
      } else if (this.validationHelper.isWhitespaceOrEmptyString(jsonBody.lastName)) {
        throw new Error('Blank last name specified.');
      }

      if (!jsonBody.emailAddress) {
        throw new Error('No email address specified.');
      } else if (this.validationHelper.isWhitespaceOrEmptyString(jsonBody.emailAddress)) {
        throw new Error('Blank email address specified.');
      } else if (!this.validationHelper.isValidEmail(jsonBody.emailAddress)) {
        throw new Error('Email address is not in a valid format.');
      }

      if (!jsonBody.password) {
        throw new Error('No password specified.');
      } else if (this.validationHelper.isWhitespaceOrEmptyString(jsonBody.password)) {
        throw new Error('Blank password specified');
      }

      if (!this.validationHelper.isValidBoolean(jsonBody.enabled)) {
        throw new Error('Boolean value expected for enabled.');
      }

      return callback();
    } catch (error) {
      return callback(error);
    }
  };
};
