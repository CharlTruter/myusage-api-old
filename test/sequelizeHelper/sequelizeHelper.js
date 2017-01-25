'use strict';

const path = require('path');

module.exports = function SequelizeHelpers() {
  const _this = this;
  const sequelizePath = path.join(__dirname, '..', '..', 'sequelize', 'models');
  this.sequelize = require(sequelizePath);

  this.truncateTables = function truncateTables(callback) {
    if (Object.keys(this.sequelize.sequelize.models).length > 0) {
      let runCount = 0;
      for (let i = 0; i < Object.keys(this.sequelize.sequelize.models).length; i += 1) {
        this.sequelize.sequelize.models[Object.keys(this.sequelize.sequelize.models)[i]].truncate()
          .then(function truncateCallback() {
            runCount += 1;
            if (runCount === Object.keys(_this.sequelize.sequelize.models).length) {
              callback();
            }
          })
          .catch(function truncateErrorCallback(error) {
            callback(error);
          });
      }
    }
  };
};
