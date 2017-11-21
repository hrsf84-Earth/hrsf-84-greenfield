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
