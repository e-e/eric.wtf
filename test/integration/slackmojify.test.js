const app = require('../../server');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Slackmojify', function() {
  describe('#GET /slackmojify', function() {
    it('should load', function(done) {
      request(app)
        .get('/slackmojify')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.text).match(/slackmojify/g);
          done();
        });
    });
  });
});
