var express = require('express');
var app = express();
var RequestUrl = require('./requestUrl');
var requestUrl = new RequestUrl();

app.get('/', function(req, res) {
  res.send("hello testing 123");
});

app.get('/go', function (req, res) {
  var options1 = {
    hostname: 'code.jquery.com',
    path: '/jquery-1.9.1.min.js'
  };
  requestUrl.fetchContents(options1);
  requestUrl.fetchContents({
    hostname: 'ajax.googleapis.com',
    path: '/ajax/libs/jquery/1.9.1/jquery.min.js'
  });
  res.send("ok");
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
