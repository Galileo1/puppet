/**
 * Puppeteer Page class extension
 */

const Page = require('puppeteer/lib/Page').Page;

/**
 * Returns the locator on the page
 * @param {string} selector on the page
 * @returns {Promise<JSHandle>} promise of type JSHandle
 */
Page.prototype.element = async function(selector) {
    return await this.waitForSelector(selector, {visible : true});  
}

/**
 * Sends the given text to the seletor.
 * @param {string} selector on the page
 * @param {string} text to be entered in the selector
 */
Page.prototype.sendText = async function(selector, text) {
    let element = await this.waitForSelector(selector, {visible : true});
    await element.type(text);
}