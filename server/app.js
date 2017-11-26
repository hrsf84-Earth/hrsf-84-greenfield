var bodyParser = require('body-parser');
var express = require ('express');
var db = require ('../database/database.js');
var unsplash = require('../helpers/unsplash.js');
var crypto = require('../helpers/authentication.js');
var app = express();

var port = process.env.PORT || 8080;

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(db.createCookie);
app.use(express.static('./client/dist'));


app.get('/photos', function(req, res) {
  console.log('REQ QUERY', req.body);

  var term = req.query.query || 'tigers';
  var page = req.query.page || 1;
  console.log('THE TERM: ', term, ' PAGE: ', page)

  unsplash.getPhotos(term, page, function(err, data){
    if(err){
      res.status(503).send('ERROR RETRIEVING PHOTOS ' + err);
    } else {
      // console.log('data sent via get photos', data);
      res.send(data);
    }
  });
});

app.get('/search', function(req, res) {
  //need to update req so it posts the right data in getPhotos
  unsplash.getPhotos(req, function(err, data){
    if(err){
      res.status(404).send('ERROR RETRIEVING PHOTOS ' + err);
    } else {
      console.log("data send via get search")
      res.send(data[0].urls.full);
    }
  });
});

// { '{"username":"Bob Eats a lot","password":"i am a password"}': '' } -entry info

app.post('/users/signup', urlencodedParser, function(req, res) {
  console.log(Object.keys(req.body));
  var start = req.body //need to tailor this
  var keys = Object.keys(start)
  // console.log('KEYS', keys)
  var user = JSON.parse(keys)
  console.log(user);

  // check if user exists
  db.checkUser(user)
  .then((result) => {
    if ( result.length === 0 ) {
      console.log('RESULT LENGTH IS 0', result);
      db.addUser(user)
      .then((result) => {
        console.log('', result)
        res.status(201).send({
          'message': 'NEW USER ADDED'
        })
      })
    } else {
      console.log('User already exists: here is the existing row entry', result)
      res.status(400).send({
        'message': 'USER ALREADY EXISTS'
      })
    }
  })

  // db.query('SELECT username from Users WHERE username = ' + req.body.username + '', function(err , result ) {
  //   if ( result.length === 0 ) {
  //    db.query('INSERT INTO Users SET ?', user, function(err, res) {
  //       if ( err ) {
  //         console.log('error: ', err)
  //       } else {
  //         console.log('success: user signed up in db')
  //       }
  //     })
  //   } else {
  //     res.send('error, user already exists')
  //   }
  // })
  // res.send('Success, user signed up');

})


// login sent to route /users/login/
// { '{"username":"Bob Eats a lot","password":"i am a password"}': '' }


app.post('/users/login', urlencodedParser, function (req, res) {
  console.log('from cliet login: ', req.body);
  let start = req.body;
  console.log('START', start);
  let keys = Object.keys(start);
  console.log('KEYS', keys);
  let user = JSON.parse(keys);
  console.log('USER', user);
  db.checkUser(user)
  .then((result) => {
    if ( result.length > 0 ) {
      var attemptedPassword = user.password;
      console.log('THE ATTEMPTED PASSWORD', attemptedPassword, 'and result', result);

      var existingPassword = result[0].password;
      var existingUserId = result[0].id;
      var salt = result[0].salt;

      console.log('ALL 3', existingPassword, existingUserId, salt);

      if (crypto.compareHash(attemptedPassword, existingPassword, salt) ){
        console.log('User has verified password');
        //Ultimately we're goint to have to send message to user that they are logged in. Front-end has to respond appropriately
        res.status(200).send({
          'code': 200,
          'message': 'login successful'
        });

      } else {
        //Ultimately we're goint to have to send message to user that they inserted wrong password. Front-end has to respond appropriately
        console.log('password not verified');
        res.status(401).send({
          'message': 'Incorrect Username/Password'
        })
      }

    } else {
      //we need to send back a 'pop-up' informing the user of a mistake
      console.log('USER DOES NOT EXIST');
      res.status(401).send({
        'message': 'Incorrect Username/Password'
      })
    }
  })
})


if(!module.parent){
  app.listen(port, () => {console.log ('listening to port: ', port)});
    // app.listen(3000);
}
