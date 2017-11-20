var express = require ('express')
var app = express();
var unsplash = require('../helpers/unsplash.js');
var bodyParser = require('body-parser')


var port = process.env.PORT || 8080;
app.listen(port, () => {console.log ('listening to port: ', port)})

// app.use(function (req, res) {
//   res.status(200).send('Hello Earth - Welcome To the Web')
// })
app.use(express.static('./client/dist'))


app.get('/photos', function(req, res){
  console.log('REQ QUERY', req.query);
  unsplash.getPhotos('tigers', function(err, data){
    if(err){
      res.status(404).send('ERROR RETRIEVING PHOTOS');
    }
    console.log(data);
    data = data.map(function(element) {
      return element.urls.full;
    })
    console.log(data);
    res.send(data);
  });
});

 app.get('/search', function(req, res) {
  //need to update req so it posts the right data in getPhotos
  unsplash.getPhotos(req, function(err, data){
    if(err){
      res.status(404).send('ERROR RETRIEVING PHOTOS');
    }
    res.send(data[0].urls.full);

  });
});