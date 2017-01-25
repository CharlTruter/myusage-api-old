'use strict';

module.exports = function UserModel(args) {
  let methodArgs = args;
  if (!methodArgs) {
    methodArgs = {};
  }

  this.id = args.id || 0;
  this.username = args.username || '';
  this.displayName = args.displayName || '';
  this.apiUserId = args.apiUserId || 0;
  this.createdAt = args.createdAt || null;
  this.updatedAt = args.updatedAt || null;
};
