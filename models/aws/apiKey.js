'use strict';

module.exports = function apiKey(args) {
  let methodArgs = args;

  if (!methodArgs) {
    methodArgs = {};
  }

  this.id = methodArgs.id || '';
  this.value = methodArgs.value || '';
  this.name = methodArgs.name || '';
  this.description = methodArgs.description || '';
  this.enabled = methodArgs.enabled || false;
  this.createdAt = methodArgs.createdAt || null;
  this.updatedAt = methodArgs.updatedAt || null;
};
