'use strict';

module.exports = {
  up: function CreateDetailedUserUsageUp(queryInterface, Sequelize) {
    return queryInterface.createTable('DetailedUserUsages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      usage_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bytes_downloaded: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      bytes_uploaded: {
        type: Sequelize.BIGINT,
        allowNull: false,
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
  down: function CreateDetailedUserUsageDown(queryInterface) {
    return queryInterface.dropTable('DetailedUserUsages');
  },
};
