var express = require ('express')
var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => {console.log ('listening to port: ', port)})

app.use(function (req, res) {
  res.status(200).send('Hello Earth')
})