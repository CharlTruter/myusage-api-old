'use strict';

module.exports = {
  up: function CreateUserUp(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      display_name: {
        type: Sequelize.STRING,
      },
      api_user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
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
  down: function CreateUserDown(queryInterface) {
    return queryInterface.dropTable('Users');
  },
};
