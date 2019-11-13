
var fs = require('fs');
var koa = require('koa');

var app = module.exports = koa();

/**
 * Create the `GET /stream` route that streams this file.
 * In node.js, the current file is available as a variable `__filename`.
 */

app.use(function* (next) {
  const stat = function (filename) {
    return done => {
      fs.stat(filename, (err, stats) => {
        done(err, stats.size);
      });
    }
  };
  if (this.request.path !== '/stream') return yield* next;
  const stream = fs.createReadStream(__filename);
  this.response.type = 'application/javascript';
  this.response.length = yield stat(__filename);
  this.response.body = stream;
});

/**
 * Create the `GET /json` route that sends `{message:'hello world'}`.
 */

app.use(function* (next) {
  if (this.request.path !== '/json') return yield* next;

  this.response.body = { message: 'hello world' };
});
