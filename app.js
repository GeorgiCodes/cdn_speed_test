var express = require('express');
var app = express();
var RequestUrl = require('./requestUrl');


app.get('/', function(req, res) {
  res.send("hello testing 123");
});

app.get('/go', function (req, res) {
  var requestUrl = new RequestUrl();
  requestUrl.fetchContents();
  res.send("ok");
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
