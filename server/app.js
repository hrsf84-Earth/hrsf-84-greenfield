var express = require ('express')
var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => {console.log ('listening to port: ', port)})

app.use(express.static('./client/dist'))

app.use(function (req, res) {
  res.status(200).send('Hello Earth - Welcome To the Web')
})

app.get('/', function(req, res) {
  res.status(201).send('received the initial get from the Client, the photo from API will go here')
})
