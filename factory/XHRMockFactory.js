const _ = require('lodash');

class XHRMockFactory {
  constructor(url) {
    this.mocks = [];
    this.BASE_URL = url;
  }

  mocker(page) {
    page.setRequestInterception(true);
    page.on('request', req => {
      const mock = _.find(this.mocks, ({ finalUrl }) =>
        req.url().includes(finalUrl)
      );
      if (mock) {
        req.respond(mock);
      } else {
        req.continue();
      }
    });
  }

  mock(url, body, status, method) {
    let finalUrl = this.BASE_URL.concat(url);
    if (body !== null) {
      this.mocks = [
        ...this.mocks,
        {
          finalUrl,
          body: _.isString(body) ? body : JSON.stringify(body),
          status,
          method,
          contentType: 'application/json; charset=utf-8'
        },
      ];
    }
  }
}

module.exports = XHRMockFactory;
