var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jade');

app.get("/", function (req, res) {	  
  res.render('index');
});  

app.get("/:url", function (req, res) {
  var url = req.params.url;
  request({
    uri: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBBfGfDO1iLO87BBlsyeAIFPIw8LsCR5WI",
    method: "POST",
    body: JSON.stringify({
          longUrl: url
    }),
    headers: {
      "Content-Type": "application/json",         
    }
  }, function(err, response, body) {
    var sid = JSON.parse(body).id;
    res.render('result', {sid:sid, oid:url})  
	}); 
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app  is listening on port ' + listener.address().port);
});
