'use strict';

module.exports = function sequelizeMock(noValues) {
  const SequelizeMock = require('sequelize-mock');
  const sqlizeMock = new SequelizeMock();

  if (noValues !== undefined && noValues != null && noValues === true) {
    this.ApiUser = sqlizeMock.define('ApiUsers', null, {
      instanceMethods: {
        get: function getCallback() {
          return null;
        },
      },
    });

    this.User = sqlizeMock.define('User', null, {
      instanceMethods: {
        get: function getCallback() {
          return null;
        },
      },
    });

    this.DetailedUserUsage = sqlizeMock.define('DetailedUserUsage', null, {
      instanceMethods: {
        get: function getCallback() {
          return null;
        },
      },
    });
  } else {
    const testApiUser = {
      id: 1,
      first_name: 'John',
      last_name: 'Smith',
      email_address: 'foo@bar.com',
      password: 'PASSWORDHASH',
      enabled: 1,
      api_key: 'APIKEY',
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.ApiUser = sqlizeMock.define('ApiUsers', testApiUser, {
      instanceMethods: {
        get: function getCallback() {
          return testApiUser;
        },
      },
    });

    const testUser = {
      id: 1,
      username: 'johnsmith',
      display_name: 'John Smith',
      api_user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.User = sqlizeMock.define('Users', testUser, {
      instanceMethods: {
        get: function getCallback() {
          return testUser;
        },
      },
    });

    const testDetailedUserUsage = {
      id: 1,
      user_id: 2,
      usage_time: new Date(),
      bytes_downloaded: 1234,
      bytes_uploaded: 4321,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.DetailedUserUsage = sqlizeMock.define('DetailedUserUsage', testDetailedUserUsage, {
      instanceMethods: {
        get: function get() {
          return testDetailedUserUsage;
        },
      },
    });

    this.DetailedUserUsage.bulkCreate = function bulkCreate() {
      return {
        then: function then(endingFunction) {
          endingFunction();
          return {
            catch: function catchProperty() {
            },
          };
        },
      };
    };
  }
};
