
var request = require('supertest');

var app = require('./index.js');

describe('Error Handling', function () {
  it('should return "internal server error"', function (done) {
    request(app.listen())
      .get('/')
      .expect(500)
      .expect('internal server error', done);
  })

  it('should emit an error event', function (done) {
    app.once('error', function (e) {
      console.log('err', e);
      done();
    });

    request(app.listen())
      .get('/')
      .end(function noop() {
        console.log('request end');
      });
  })
})
