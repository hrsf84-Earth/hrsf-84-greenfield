var express = require ('express')
var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => {console.log ('listening to port: ', port)})

app.use(function (req, res) {
  res.status(200).send('Hello Earth - Welcome To the Web')
})

app.get('/', function(req, res) {
<<<<<<< 4e7ccd04bba99e88870bf4e8e1fd0c5937605b66
  res.status(201).send('received the initial get from the Client, the photo from API will go here')
})
=======
	res.status(201).send('received the initial get from the Client, the photo from API will go here')
})

//comment test for Heroku, 
// more testing
//3rd test
>>>>>>> Commented for 3rd try for testing
