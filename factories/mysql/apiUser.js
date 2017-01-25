'use strict';

module.exports = {
  models: {
    ApiUserModel: require('./../../models/mysql/apiUser.js'),
  },
  parseRow: function ParseMysqlApiUserRow(row) {
    if (!row) {
      return null;
    }

    const dateFormat = require('date-format');

    const modelArgs = {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      emailAddress: row.email_address,
      passwordHash: row.password_hash,
      apiAccess: row.api_access,
      websiteAccess: row.website_access,
      apiKey: row.api_key,
      createdAt: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.created_at),
      updatedAt: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.updated_at),
    };

    return new this.models.ApiUserModel(modelArgs);
  },
};
