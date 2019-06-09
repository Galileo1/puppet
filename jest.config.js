const path = require('path');

module.exports = {
  globalSetup: path.join(__dirname, './default_setup/setup.js'),
  globalTeardown: path.join(__dirname, './default_setup/teardown.js'),
  testEnvironment: path.join(__dirname, './default_setup/env.js'),
  rootDir: process.cwd()
}