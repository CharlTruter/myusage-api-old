'use strict';

module.exports = function DetailedUserUsageModel(sequelize, DataTypes) {
  const DetailedUserUsage = sequelize.define('DetailedUserUsage', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    usage_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bytes_downloaded: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    bytes_uploaded: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    underscored: true,
    classMethods: {
      associate() {
      },
    },
  });
  return DetailedUserUsage;
};
