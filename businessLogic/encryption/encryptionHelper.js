'use strict';

module.exports = function encryptionHelper(cryptoPackage) {
  this.crypto = cryptoPackage;

  this.getDefaultAlgorithm = function getDefaultAlgorithm() {
    return 'aes256';
  };

  this.encryptValue = function encryptValue(text, salt, algorithm, callback) {
    try {
      let methodAlgorithm = algorithm;

      if (methodAlgorithm === undefined || methodAlgorithm == null) {
        methodAlgorithm = this.getDefaultAlgorithm();
      }

      const cipher = this.crypto.createCipher(methodAlgorithm, salt);
      const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

      return callback(null, encrypted);
    } catch (error) {
      return callback(error);
    }
  };

  this.decryptValue = function decryptValue(text, salt, algorithm, callback) {
    try {
      if (!text || text == null || text.toString().trim().length === 0 || !salt || salt == null ||
        salt.toString().trim().length === 0) {
        return callback();
      }
      let methodAlgorithm = algorithm;

      if (methodAlgorithm === undefined || methodAlgorithm == null) {
        methodAlgorithm = this.getDefaultAlgorithm();
      }

      const decipher = this.crypto.createDecipher(methodAlgorithm, salt);
      const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');

      return callback(null, decrypted);
    } catch (error) {
      return callback(error);
    }
  };
};
