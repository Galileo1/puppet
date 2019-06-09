/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');
const BrowserFactory = require('../factory/BrowserFactory');
const config = JSON.parse(process.env.__CONFIGURATION);
const constants = require(path.join(process.cwd(), '/constants'));

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  
    this.global.__BASEURL__ = 'http://localhost:80'
    let dataConfig = require(path.join(process.cwd(),'/data_config/live_data.json'));
    
    /** setup global baseUrl  */
    if (config.region == 'STEAKS') {
      this.global.__BASEURL__ = constants.STEAKS_URL
    }

    if (config.region == 'UAT') {
      this.global.__BASEURL__ = constants.UAT_URL
    }

    /** setup global mocks */
    if (config.mocks == true) {
        this.global.__MOCKS__ = new XHRMockFactory(this.global.__BASEURL__)
        dataConfig = require(path.join(process.cwd(),'/data_config/mock_data.json'))
    }

    /** setup global data config */
    this.global.__DATACONFIG__ = JSON.parse(JSON.stringify(dataConfig));
    console.log(`data-config: ${this.global.__DATACONFIG__}`)

  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
