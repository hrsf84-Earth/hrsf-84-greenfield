var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var should = chai.should();
var server = require('../../server/app.js');
// var schema = require ('../../database/schema_test.sql')
try {
  //try to find config file, if doesn't exist then assume that
  //server is live and will retrieve variables from enviromental variables on server
  var config = require('../config.js');
  var mySQL_username = config.mySQL_username ;
  var mySQL_password = config.mySQL_password;
  var mySQL_DBName = config.mySQL_DBName;
  var mySQL_port = config.mySQL_port;
  var JAWSDB_URL = config.JAWSDB_URL;
} catch (err) {
  var mySQL_username = process.env.mySQL_username;
  var mySQL_password = process.env.mySQL_password;
  var mySQL_DBName = process.env.mySQL_DBName;
  var mySQL_port = process.env.mySQL_port;
  var JAWSDB_URL = process.env.JAWSDB_URL;
}

var port = 8081;

chai.use(chaiHttp);

var waitForThen = function (test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

describe('Server', function() {
  var response;
  chai.request('http://localhost:8080')
  .get('/photos')
  .send()
  .end(function(err, res){
    response = res;
    // res.should.have.status(200);
    // // console.log ('body', res.body)
    // res.body.should.be.an('array');
    // res.body.length.should.equal(30);
    // res.body[0].should.be.a('object');
    // res.body[0].id.should.be.a('string');
    // res.body[0].id.should.not.be.equal(res.body[1].id)
    // res.body[0].urls.should.be.a('object')
    done()
  });


  xdescribe('server has GET /photos which returns information from api', function() {
    it('api request should return a properly formated array ', function(done) {
      console.log ('here')

      chai.request('http://localhost:8080')
      .get('/photos')
      .send()
      .end(function(err, res){
        res.should.have.status(200);
        // console.log ('body', res.body)
        res.body.should.be.an('array');
        res.body.length.should.equal(30);
        res.body[0].should.be.a('object');
        res.body[0].id.should.be.a('string');
        res.body[0].id.should.not.be.equal(res.body[1].id)
        res.body[0].urls.should.be.a('object')
        done()
      });
    });
    describe('test', function (done) {
      console.log('responsexx', response);
    })
  })


  xdescribe('server has GET /search', function() {
    it('should return results from api search', function() {
    	chai.request('http://localhost:8080')
        .get('/search')
        .send()
    		.end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.equal(30);
          res.body[0].should.be.a('object');
          res.body[0].id.should.be.a('string');
          res.body[0].id.should.not.be.equal(res.body[1].id)
          res.body[0].urls.should.be.a('object')
		      done();
	  		});
    });
  })


  xdescribe('server has POST /users/login', function() {
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

// work in progress
// xdescribe('Database', function() {
//   var db;
//   var server
//   var localDbName = 'test';
//   var localdbpassword = '';

//   var clearDatabase = function (connection, tablenames, done) {
//     var count = 0;
//     tablenames.forEach(function(tablename) {
//       connection.query('DROP TABLE IF EXISTS ' + tablename, function() {
//         count++;
//         if (count === tablenames.length) {
//           return schema(db).then(done);
//         }
//       });
//     });
//   }
//   beforeEach(function(done) {
//     db = mysql.createConnection({
//       host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//       user: mySQL_username,
//       password: mySQL_password,
//       database: 'impulse_test',
//       port: mySQL_port
//     });

//   })
//   var tablenames = ['Users', 'Sessions', 'Photos', 'Favorites'];
//   db.connect(function (err) {
//     if (err) { return done(err); }

//     clearDatabase(db, tablenames, function() {
//       server = app.listen(port, done);
//     });
//   })

//   afterEach(function () {
//     server.close();
//   })
// })
