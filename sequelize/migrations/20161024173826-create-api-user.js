'use strict';

module.exports = {
  up: function CreateApiUserUp(queryInterface, Sequelize) {
    return queryInterface.createTable('ApiUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      api_access: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      website_access: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      api_key: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: function CreateApiUserDown(queryInterface) {
    return queryInterface.dropTable('ApiUsers');
  },
};
