const puppeteer = require('puppeteer');

const desktopViewPort = {
  width: 1600,
  height: 900,
};

const BrowserFactory = {
  setupBrowser: async () => {
    console.log(`launching`)
    const browser = await puppeteer.launch(
      process.env.DEBUG
        ? {
            headless: false,
            args: [
              `--no-sandbox`,
              '--start-maximized',
              '--disable-setuid-sandbox',
              `--disable-infobars`,
            ],
            slowMo: 500,
            devtools: true,
          }
        : {
            headless: false,
            args: [
              `--no-sandbox`,
              '--start-maximized',
              '--disable-setuid-sandbox',
              `--disable-infobars`,
              `--disable-dev-shm-usage`,
            ],
            executablePath: process.env.CHROME_BIN || null,
            ignoreHTTPSErrors: true,
            devtools: true,
            dumpio: false,
          }
    );
    return browser;
  },

  newPage: async browser => {
    const context = await browser.defaultBrowserContext();
    await context.clearPermissionOverrides();
    await context.overridePermissions(`https://${process.env.NODE_ENV}`, [
      'geolocation',
    ]);
    const page = await context.newPage();
    await page.setViewport({
      width: desktopViewPort.width,
      height: desktopViewPort.height,
    });
    return page;
  }
};

module.exports = BrowserFactory;
