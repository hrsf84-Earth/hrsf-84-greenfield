var mysql = require('mysql');
var config = require('../config.js');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var con = mysql.createConnection({
  host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: config.mySQL_username,
  password: config.mySQL_password,
  port: '3306'
});

con.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});


module.exports.con = con;
