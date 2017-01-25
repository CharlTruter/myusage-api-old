'use strict';

module.exports = function ApiUserModel(sequelize, DataTypes) {
  const ApiUser = sequelize.define('ApiUser', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    website_access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    api_key: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return ApiUser;
};
