'use strict';

const ConfigRepo = require('../../repositories/configuration/configurationRepository.js');
const CryptoPackage = require('crypto');

module.exports = function encryptionHelper() {
  this.crypto = CryptoPackage;
  this.configRepo = new ConfigRepo();
  this.defaultAlgorithm = 'aes256';

  this.encryptValue = function encryptValue(text, algorithm, callback) {
    try {
      let methodAlgorithm = algorithm;

      if (methodAlgorithm === undefined || methodAlgorithm == null) {
        methodAlgorithm = this.defaultAlgorithm;
      }

      const salt = this.configRepo.getEncryptionSalt();

      const cipher = this.crypto.createCipher(methodAlgorithm, salt);
      const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

      return callback(null, encrypted);
    } catch (error) {
      return callback(error);
    }
  };

  this.decryptValue = function decryptValue(text, algorithm, callback) {
    try {
      const salt = this.configRepo.getEncryptionSalt();
      if (!text || text == null || text.toString().trim().length === 0 || !salt || salt == null ||
        salt.toString().trim().length === 0) {
        return callback();
      }
      let methodAlgorithm = algorithm;

      if (methodAlgorithm === undefined || methodAlgorithm == null) {
        methodAlgorithm = this.defaultAlgorithm;
      }

      const decipher = this.crypto.createDecipher(methodAlgorithm, salt);
      const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');

      return callback(null, decrypted);
    } catch (error) {
      return callback(error);
    }
  };
};
