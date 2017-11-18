var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var con = mysql.createConnection({
  host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'g4gjtnka90chc17j ',
  password: 'au2mhsybbaf5tuuw',
  port: '3306'
});

con.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});


module.exports.con = con;
