'use strict';

module.exports = function errorResponseFactory() {
  this.models = {
    ErrorResponseModel: require('../../models/api/errorResponse.js'),
  };

  this.parseResponse = function parseResponse(args) {
    let methodArgs = args;

    if (!methodArgs) {
      methodArgs = {};
    }

    const errorResponseArgs = {};

    if (methodArgs.errorType) {
      errorResponseArgs.errorType = methodArgs.errorType;
    }

    if (methodArgs.errorMessage) {
      errorResponseArgs.errorMessage = methodArgs.errorMessage;
    }

    if (methodArgs.errorCode) {
      errorResponseArgs.errorCode = methodArgs.errorCode;
    }

    if (methodArgs.startDate && methodArgs.endDate) {
      errorResponseArgs.requestTime = methodArgs.endDate.getTime() - methodArgs.startDate.getTime();
    }

    return new this.models.ErrorResponseModel(errorResponseArgs);
  };
};
