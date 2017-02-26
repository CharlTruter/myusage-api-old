'use strict';

const chai = require('chai');
const path = require('path');
const sinon = require('sinon');
const aws = require('aws-sdk');

const assert = chai.assert;
const awsClientPath = path.join(__dirname, '..', '..', '..', '..', 'repositories', 'aws', 'awsClient.js');
const AwsClientClass = require(awsClientPath);

describe('AwsClient', function AwsClient() {
  describe('Constructor', function Constructor() {
    it('Calls the correct methods', function CallsCorrectMethods(done) {
      sinon.spy(aws.config, 'update');
      const awsClient = new AwsClientClass(aws);

      try {
        assert.isDefined(awsClient);
        assert.equal(aws.config.update.called, true);
        assert.equal(aws.config.update.callCount, 2);
        return done();
      } catch (error) {
        aws.config.update.restore();
        return done(error);
      }
    });
  });
});
