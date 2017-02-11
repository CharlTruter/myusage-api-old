'use strict';

module.exports = function errorResponse(args) {
  let methodArgs = args;

  if (!methodArgs) {
    methodArgs = {};
  }

  this.meta = {
    errorType: methodArgs.errorType || 'Unknown',
    errorMessage: methodArgs.errorMessage || null,
    errorCode: 500,
  };

  if (methodArgs.requestTime) {
    this.meta.requestTime = methodArgs.requestTime;
  }
};
