
var koa = require('koa');

/**
 * This is a promisified version of zlib's gzip function,
 * allowing you to simply `yield` it without "thunkifying" it.
 *
 *   app.use(function* (next) {
 *     this.response.set('Content-Encoding', 'gzip');
 *     this.response.body = yield gzip('something');
 *   })
 */
var gzip = require('mz/zlib').gzip;

var app = module.exports = koa();

app.use(function* () {
  const ae = this.request.acceptsEncodings('gzip', 'identity');

  switch (ae) {
    case 'gzip':
      this.response.set('Content-Encoding', 'gzip');
      this.response.set('content-type', 'text/plain');
      this.response.body = yield gzip('hello world');
      break;
    case 'identity':
      this.response.set('Content-Encoding', 'identity');
      this.response.body = 'hello world';
      break;
    default:
      break;
  }
});

// app.listen(9090);
