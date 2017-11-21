var mysql = require('mysql');
try { 
  //try to find config file, if doesn't exist then assume that 
  //server is live and will retrieve variables from enviromental variables on server
  var config = require('../config.js');
} catch (err) {
} finally {
  var mySQL_username = process.env.mySQL_username ||  config.mySQL_username ;
  var mySQL_password = process.env.mySQL_password || config.mySQL_password;
  var mySQL_port = process.env.mySQL_port || config.mySQL_port;
  // var JAWSDB_URL = process.env.JAWSDB_URL || config.JAWSDB_URL;
}

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var con = mysql.createConnection({
  host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: mySQL_username,
  password: mySQL_password,
  port: mySQL_port
});

con.connect(function(err) {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Database Connected!');
  }
});


module.exports.con = con;


////////////// sessions ///////////////////////

var MySQLStore = require('express-mysql-session')(session);
var crypto = require('../helpers/authentication.js');

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
session({
  key: 'impulse_cookie_ID',
  secret: 'impulse_love_photos',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
})

// Access the session as req.session
module.exports.createCookie = ((req, res, next) => {
  res.cookie('impulse_cookie_ID', crypto.createRandom32String())
  next();
})