var bodyParser = require('body-parser');
var express = require ('express');
var db = require ('../database/database.js');
var unsplash = require('../helpers/unsplash.js');

var app = express();

var port = process.env.PORT || 8080;

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(db.createCookie);
app.use(express.static('./client/dist'));


app.get('/photos', function(req, res) {
  console.log('REQ QUERY', req.query);

  var term = req.query.query || 'tigers';
  var page = req.query.page || 1;
  console.log('THE TERM: ', term, ' PAGE: ', page)

  unsplash.getPhotos(term, page, function(err, data){
    if(err){
      res.status(404).send('ERROR RETRIEVING PHOTOS ' + err);
    } else {
      console.log('data sent via get photos', data);
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
  console.log(req.body);
  var start = req.body //need to tailor this
  var keys = Object.keys(start)
  var user = JSON.parse(keys)
  //check if user exists
  db.checkUser(user)
  .then((result) => {
    if ( result.length === 0 ) {
      db.addUser(user)
      .then((end) => {
        console.log(end)
        res.end()
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
  let keys = Object.keys(start);
  let user = JSON.parse(keys);
  db.checkUser(user)
  .then((result) => {
    if ( result.length > 0 ) {
      if ( user.password === result[0].password ) {
        res.send({
          'code': 200,
          'message': 'login successful'
        });
      } else {
        //we need to send back a message ('pop-up' maybe?) informing the user of a mistake
        res.send({
          'code': 204,
          'message': 'incorrect password'
        })
      }
    } else {
      //we need to send back a 'pop-up' informing the user of a mistake
      res.send({
        'code': 204,
        'message': 'incorrect username'
      })
    }
  })
})


if(!module.parent){
  app.listen(port, () => {console.log ('listening to port: ', port)});
    // app.listen(3000);
}
