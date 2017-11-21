var bodyParser = require('body-parser');
var express = require ('express');

var db = require ('../database/database.js');
var unsplash = require('../helpers/unsplash.js');

var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => {console.log ('listening to port: ', port)});

app.use(db.createCookie)

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
  });
});

 app.get('/search', function(req, res) {
  //need to update req so it posts the right data in getPhotos
  unsplash.getPhotos(req, function(err, data){
    if(err){
      res.status(404).send('ERROR RETRIEVING PHOTOS');
    } else {
      console.log("data send via get search")
      res.send(data[0].urls.full);
    }
  });
});