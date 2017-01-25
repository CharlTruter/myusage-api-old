'use strict';

module.exports = {
  getEncryptionSalt: function getEncryptionSalt() {
    return process.env.ENCRYPTION_SALT;
  },
};
