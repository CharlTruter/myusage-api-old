'use strict';

module.exports = function successResponse(args) {
  let methodArgs = args;

  if (!methodArgs) {
    methodArgs = {};
  }

  this.meta = methodArgs.meta || {};

  this.meta.code = methodArgs.statusCode || 200;

  if (methodArgs.requestTime) {
    this.meta.requestTime = methodArgs.requestTime;
  }

  if (methodArgs.data) {
    this.data = methodArgs.data;
  }

  if (methodArgs.pagination) {
    this.pagination = methodArgs.pagination;
  }
};
