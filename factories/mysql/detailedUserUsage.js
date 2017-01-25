'use strict';

module.exports = {
  models: {
    DetailedUserUsageModel: require('./../../models/mysql/detailedUserUsage.js'),
  },
  parseRow: function ParseMysqlDetailedUserUsageRow(row) {
    if (!row) {
      return null;
    }

    const dateFormat = require('date-format');

    const modelArgs = {
      id: row.id,
      userId: row.user_id,
      usageTime: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.usage_time),
      bytesDownloaded: row.bytes_downloaded,
      bytesUploaded: row.bytes_uploaded,
      createdAt: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.created_at),
      updatedAt: dateFormat('yyyy-MM-dd hh:mm:ss:SSS', row.updated_at),
    };

    return new this.models.DetailedUserUsageModel(modelArgs);
  },
};
