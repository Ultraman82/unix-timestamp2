var express = require('express');
var app = express();

app.use(express.static('static'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/whoami', function (req, res) {
  var os = req.header('user-agent').split(')')[0].split('(')[1];
  var language = req.header('accept-language').split(',')[0];
  var ip = req.header('x-forwarded-for').split(',')[0];
  var data = {
    os: os,
    language: language,
    ip: ip
  };  
  res.render('whoami', {data:data});
  
});

app.listen(process.env.PORT || 8080, function () {
  console.log('API is listening!');
});
