var bodyParser = require('body-parser');
var config = require('../config.js');
var db = require ('../database/database.js');
var express = require ('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var unsplash = require('../helpers/unsplash.js');
var crypto = require('../helpers/authentication.js');

var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => {console.log ('listening to port: ', port)});

// Sets variables for use with cookie persistence
var mySQL_username = process.env.mySQL_username ||  config.mySQL_username ;
var mySQL_password = process.env.mySQL_password || config.mySQL_password;
var mySQL_port = process.env.mySQL_port || config.mySQL_port;
var mySQL_DBName = process.env.mySQL_DBName || config.mySQL_DBName;
var JAWSDB_URL = process.env.JAWSDB_URL || config.JAWSDB_URL;

// Creates session options for express-session with MySQLStore
var options = {
  host: JAWSDB_URL,
  port: mySQL_port,
  user: mySQL_username,
  password: mySQL_password,
  database: mySQL_DBName,
  expiration: 600000,
  // Whether or not to create the sessions database table, if one does not already exist:
  createDatabaseTable: false
};

// Need to uncomment this for connecting to mySQL
// var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore(options);

// Creates the session information and makes function for issuing a cookie.
app.use(session({
  key: 'impulse_cookie_ID',
  secret: 'impulse_love_photos',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// Access the session as req.session
app.use(function(req, res, next) {
  console.log('INSIDE THE APP.GET FOR A SLASH PAGE REQUEST');
  // if (req.session.views) {
  //   req.session.views++;
  //   res.setHeader('Content-Type', 'text/html');
  //   res.write('<p>views: ' + req.session.views + '</p>');
  //   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
  //   res.end();
  // } else {
  //   req.session.views = 1;
    res.cookie('impulse_cookie_ID', crypto.createRandom32String())
    next();
  // }
});

app.use(express.static('./client/dist'));

app.get('/photos', function(req, res){

  console.log('REQ QUERY', req.query);

  var term = req.query.query || 'tigers';
  console.log('THE TERM,', term.query)

  unsplash.getPhotos(term, function(err, data){
    if(err){
      res.status(404).send('ERROR RETRIEVING PHOTOS' + err);
    } else {
      console.log('data sent via get photos')
      res.send(data);
    }

    // data = data.map(function(element) {
    //   return element.urls.regular;
    // })
    // console.log(data);

  });
});

//  app.get('/search', function(req, res) {
//   //need to update req so it posts the right data in getPhotos
//   unsplash.getPhotos(req, function(err, data){
//     if(err){
//       res.status(404).send('ERROR RETRIEVING PHOTOS');
//     } else {
//       console.log("data send via get search")
//       res.send(data[0].urls.full);
//     }
//   });
// });