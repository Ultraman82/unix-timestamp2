var express = require('express');
var app = express();

app.use(express.static('static'));
app.set('views', 'templates');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', {basedir: __dirname});
});

app.get('/api/', function (req, res) {
  var os = req.header('user-agent').split(')')[0].split('(')[1];
  var language = req.header('accept-language').split(',')[0];
  var ip = req.header('x-forwarded-for');
  
  res.send({
    os: os,
    language: language,
    ip: ip
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('API is listening!');
});