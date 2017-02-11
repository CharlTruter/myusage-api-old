'use strict';

module.exports = function ApiUserModel(args) {
  let methodArgs = args;
  if (!methodArgs) {
    methodArgs = {};
  }

  this.id = methodArgs.id || 0;
  this.firstName = methodArgs.firstName || '';
  this.lastName = methodArgs.lastName || '';
  this.emailAddress = methodArgs.emailAddress || '';
  this.password = methodArgs.password || '';
  this.enabled = methodArgs.enabled || false;
  this.apiKey = methodArgs.apiKey || '';
  this.createdAt = methodArgs.createdAt || null;
  this.updatedAt = methodArgs.updatedAt || null;
};
