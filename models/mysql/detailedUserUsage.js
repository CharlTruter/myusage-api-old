'use strict';

module.exports = function UserModel(args) {
  let methodArgs = args;
  if (!methodArgs) {
    methodArgs = {};
  }

  this.id = args.id || 0;
  this.userId = args.userId || 0;
  this.usageTime = args.usageTime || null;
  this.bytesDownloaded = args.bytesDownloaded || 0;
  this.bytesUploaded = args.bytesUploaded || 0;
  this.createdAt = args.createdAt || null;
  this.updatedAt = args.updatedAt || null;
};
