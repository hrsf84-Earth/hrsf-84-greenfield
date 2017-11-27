var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var crypto = require('../helpers/authentication.js');


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

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var con = mysql.createConnection({
  host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: mySQL_username,
  password: mySQL_password,
  database: mySQL_DBName,
  port: mySQL_port
});

con.connect(function(err) {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Database Connected!');
  }
});

////////////// sessions ///////////////////////

// Creates session options for express-session with MySQLStore
var mySQLStoreOptions = {
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
// var connection = mysql.createConnection(options); // or mysql.createPool(options); /js: this one does not work, one above does
var sessionStore = new MySQLStore(mySQLStoreOptions);

// Creates the session information and makes function for issuing a cookie.
session({
  key: 'impulse_cookie_ID',
  secret: 'impulse_love_photos',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
})


module.exports.checkUser = user => {
  return new Promise((resolve, reject) => {
    var query = 'SELECT * from Users WHERE Users.username ="' + user.username + '"';
    console.log('THE CHECK USER QUERY', query)
    con.query(query, function(err , result ) {
      if ( err ) {
        reject(err)
      } else {
        console.log('CHECK USER SUC RESULT', result)
        resolve(result);
      }
    })
  })
}
module.exports.addUser = user => {

  return new Promise((resolve, reject) => {
    var hash = crypto.createRandom32String();

    var newUser = {
      username: user.username,
      password: crypto.createHash(user.password, hash),
      salt: hash
    }


    con.query('INSERT INTO Users SET ?', newUser, function(err, res) {
      if ( err ) {
        reject('error adding user: ')
      } else {
        console.log('IN ADD USER, BOUT TO RESOLVE', res)
        resolve(res)
      }
    })

})
}
module.exports.addFavorite = (username, photoObject) => {
  console.log('INSIDE ADD FAVORITE DATABASE', username, typeof photoObject);

  photoObject = JSON.parse(photoObject);


  return new Promise((resolve, reject) => {

    var query = 'SELECT * from Users WHERE Users.username ="' + username + '"';
    console.log(query);

    var userId = null;
    var photoId = null;



    con.query(query, function(err, res){
      if(err){
        console.log(err);
        reject(err);
      } else {
        console.log('INSIDE FIND USER BLOCK', res[0].id);
        // User id is found and set by finding entry in database
        userId = res[0].id;
        var newPhoto = {
          url: photoObject.urls.regular,
          thumbnail: photoObject.urls.thumb,
          author: photoObject.user.name,
          userId: userId
        }

        con.query('INSERT INTO Photos SET ?', newPhoto, function(err, res){
          if(err){
            console.log('ERROR IN SAVING PHOTO', err);
            reject(err);
          } else {
            photoId = res.insertId;
            console.log('PHOTO SAVE SUCCESS', res.insertId);
            console.log('USER ID', userId, 'PHOTO ID', photoId);


            var favorites_query = 'INSERT INTO Favorites (photoId, userId) VALUES' + '(' + photoId + ',' + userId +   ')';
            console.log(favorites_query);
            con.query(favorites_query, function(err, res){
              if(err){
                console.log('ERROR IN INSERTING INTO JOIN TABLE OF FAVORITES', err)
                reject(err);
              } else {
                console.log('SUCCESS IN INSERTING INTO FAVORITES JOIN TABLE', res);
                resolve(res)
              }
            })





          }
        });

      }
    });




  });
}

// Access the session as req.session
module.exports.createCookie = ((req, res, next) => {
  res.cookie('impulse_cookie_ID', crypto.createRandom32String())
  next();
})

module.exports.con = con;
