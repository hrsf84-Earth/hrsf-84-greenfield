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

app.post('/users/signup', urlencodedParser, function(req, res) {
  console.log(req.body);
  var user = req.body //need to tailor this
  //check if user exists
  db.query('SELECT username from Users WHERE username = ' + req.body.username + '', function(err , result ) {
    if ( result.length === 0 ) {
     db.query('INSERT INTO Users SET ?', user, function(err, res) {
        if ( err ) {
          console.log('error: ', err)
        } else {
          console.log('success: user signed up in db')
        }
      })
    } else {
      res.send('error, user already exists')
    } 
  })
  res.send('Success, user signed up');
})


app.post('/users/login', urlencodedParser, function (req, res) {
  console.log ('recieved post');
  console.log(req.body)
  res .end();
})


if(!module.parent){
  app.listen(port, () => {console.log ('listening to port: ', port)});
    // app.listen(3000);
}