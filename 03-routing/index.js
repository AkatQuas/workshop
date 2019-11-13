
var koa = require('koa');

var app = module.exports = koa();

app.use(function* (next) {
  console.log('/');
  if (this.request.path !== '/') { return yield* next; }
  this.response.body = 'hello world';
});

app.use(function* (next) {
  console.log('/404');
  if (this.request.path !== '/404') { return yield* next; }
  this.response.body = 'page not found';
});

app.use(function* (next) {
  console.log('/500');
  if (this.request.path !== '/500') { return yield* next; }
  this.response.body = 'internal server error';
});
