'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');

const assert = chai.assert;
const encryptionHelperPath = path.join(__dirname, '..', '..', '..', '..', 'businessLogic', 'encryption', 'encryptionHelper.js');
const EncryptionHelperClass = require(encryptionHelperPath);

describe('EncryptionHelper', function EncryptionHelper() {
  describe('EncryptValue', function EncryptValue() {
    it('Calls correct methods', function CallsCorrectMethods(done) {
      const encryptionHelper = new EncryptionHelperClass();

      sinon.spy(encryptionHelper.configRepo, 'getEncryptionSalt');
      sinon.spy(encryptionHelper.crypto, 'createCipher');

      encryptionHelper.encryptValue('foobar', null, function encryptCallback(error) {
        try {
          assert.isNull(error);

          assert.equal(encryptionHelper.configRepo.getEncryptionSalt.calledOnce, true);
          assert.equal(encryptionHelper.crypto.createCipher.calledOnce, true);

          encryptionHelper.configRepo.getEncryptionSalt.restore();
          encryptionHelper.crypto.createCipher.restore();
          return done();
        } catch (innerError) {
          encryptionHelper.configRepo.getEncryptionSalt.restore();
          encryptionHelper.crypto.createCipher.restore();
          return done(innerError);
        }
      });
    });
  });

  describe('DecryptValue', function DecryptValue() {
    it('Calls correct methods', function CallsCorrectMethods(done) {
      const encryptionHelper = new EncryptionHelperClass();

      sinon.spy(encryptionHelper.configRepo, 'getEncryptionSalt');
      sinon.spy(encryptionHelper.crypto, 'createDecipher');

      encryptionHelper.decryptValue('06ae2fd796bb38a2d702181a7cde6716', null, function encryptCallback(error) {
        try {
          assert.isNull(error);

          assert.equal(encryptionHelper.configRepo.getEncryptionSalt.calledOnce, true);
          assert.equal(encryptionHelper.crypto.createDecipher.calledOnce, true);

          encryptionHelper.configRepo.getEncryptionSalt.restore();
          encryptionHelper.crypto.createDecipher.restore();
          return done();
        } catch (innerError) {
          encryptionHelper.configRepo.getEncryptionSalt.restore();
          encryptionHelper.crypto.createDecipher.restore();
          return done(innerError);
        }
      });
    });
  });
});
