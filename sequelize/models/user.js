'use strict';

module.exports = function UserModel(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_user_id: {
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
  return User;
};
