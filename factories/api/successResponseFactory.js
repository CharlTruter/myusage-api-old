'use strict';

module.exports = function successResponseFactory() {
  this.models = {
    SuccessResponseModel: require('../../models/api/successResponse.js'),
  };

  this.parseResponse = function parseResponse(args) {
    let methodArgs = args;

    if (!methodArgs) {
      methodArgs = {};
    }

    const successResponseArgs = {};

    if (methodArgs.meta) {
      successResponseArgs.meta = methodArgs.meta;
    }

    if (methodArgs.statusCode) {
      successResponseArgs.statusCode = methodArgs.statusCode;
    }

    if (methodArgs.data) {
      successResponseArgs.data = methodArgs.data;
    }

    if (methodArgs.pagination) {
      successResponseArgs.pagination = methodArgs.pagination;
    }

    if (methodArgs.startDate && methodArgs.endDate) {
      successResponseArgs.requestTime = methodArgs.endDate.getTime() -
        methodArgs.startDate.getTime();
    }

    return new this.models.SuccessResponseModel(successResponseArgs);
  };
};
