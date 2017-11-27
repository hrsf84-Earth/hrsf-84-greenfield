var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var server = require('../../server/app.js');
var should = chai.should();


chai.use(chaiHttp);

var waitForThen = function (test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

describe('Server', function() {

  describe('server has GET /photos', function() {
    it('should return true', function() {
    	chai.request('http://localhost:8080')
    		.get('/photos')
    		.end(function(err, res){
  	      res.should.have.status(200);
  	      done();
    		});
    });

    it('Should send an object containing a `data` object', function() {
      chai.request('http://localhost:8080')
        .get('/photos')
        .end(function(err, res){
          var parsedBody = JSON.parse(res.data);
          expect(parsedBody).to.have.property('results');
          expect(parsedBody.results).to.be.an('array');
          expect(response._ended).to.equal(true);
          // done();
        });
    });

    xit('Should 404 when asked for a nonexistent file', function() {
      chai.request('http://localhost:8080')
        .get('/arglebargle')
      // Wait for response to return and then check status code
        waitForThen(
          function() { return res._ended; },
          function() {
            expect(res._responseCode).to.equal(404);
          }
        );
        done();
    });

    it('should return an array of photos from /photo', function(done) {
      chai.request('http://localhost:8080')
        .get('/photos')
        .send()
        .end(function(err, res){
          // console.log (res)?
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('array');
          res.body.length.should.be.an(30);
          res.body[0].should.be.a('object');
          res.body[0].id.should.be.a('string');
          // res.body[0].should.be.a('object');
          // res.body[0].should.be.a('object');

          done();
        });
    });

  })

  describe('server has GET /search', function() {
    it('should return true', function() {
    	chai.request('http://localhost:8080')
    		.get('/search')
    		.end(function(err, res){
		      res.should.have.status(200);
		      done();
	  		});
    });

    it('Should send an object containing a `data` object', function() {
      chai.request('http://localhost:8080')
        .get('/search')
        .end(function(err, res){
          var parsedBody = JSON.parse(res.data);
          expect(parsedBody).to.have.property('results');
          expect(parsedBody.results).to.be.an('array');
          expect(response._ended).to.equal(true);
          done();
        });
    });
  })


  describe('server has POST /users/login', function() {
    it('should return true', function() {
      chai.request('http://localhost:8080')
        .post('//users/login')
        .end(function(err, res){
          res.should.have.status(201);
          done();
        });
    });
  })
});