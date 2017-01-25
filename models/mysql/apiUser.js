'use strict';

module.exports = function ApiUserModel(args) {
  let methodArgs = args;
  if (!methodArgs) {
    methodArgs = {};
  }

  this.id = args.id || 0;
  this.firstName = args.firstName || '';
  this.lastName = args.lastName || '';
  this.emailAddress = args.emailAddress || '';
  this.passwordHash = args.passwordHash || '';
  this.apiAccess = args.apiAccess || false;
  this.websiteAccess = args.websiteAccess || false;
  this.apiKey = args.apiKey || '';
  this.createdAt = args.createdAt || null;
  this.updatedAt = args.updatedAt || null;
};
