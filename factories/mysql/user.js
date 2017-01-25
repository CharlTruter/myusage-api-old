'use strict';

module.exports = {
  models: {
    UserModel: require('./../../models/mysql/user.js'),
  },
  parseRow: function ParseMysqlApiUserRow(row) {
    if (!row) {
      return null;
    }

    const dateFormat = require('date-format');

    const modelArgs = {
      id: row.id,
      username: row.username,
      displayName: row.display_name,
      apiUserId: row.api_user_id,
      createdAt: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.created_at),
      updatedAt: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.updated_at),
    };

    return new this.models.UserModel(modelArgs);
  },
};
