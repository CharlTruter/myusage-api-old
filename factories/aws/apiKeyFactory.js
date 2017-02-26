'use strict';

module.exports = function awsApiKeyFactory() {
  this.models = {
    ApiKeyModel: require('../../models/aws/apiKey.js'),
  };

  this.parseResult = function parseResult(result) {
    if (!result) {
      return null;
    }

    const apiKeyArgs = {
      id: result.id,
      value: result.value,
      name: result.name,
      description: result.description,
      enabled: result.enabled,
      createdAt: result.createdDate,
      updatedAt: result.lastUpdatedDate,
    };

    return new this.models.ApiKeyModel(apiKeyArgs);
  };
};
