const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');
const BrowserFactory = require('../factory/BrowserFactory');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');


module.exports = async function() {
  console.log(chalk.green('Launching Browser'));
  //const browser = await puppeteer.launch({});
  const browser = await BrowserFactory.setupBrowser();
  // global variable declared here is not available anywhere except in global setup and teardown
  global.__BROWSER__ = browser;
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
