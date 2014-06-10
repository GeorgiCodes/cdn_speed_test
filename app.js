// external libs
var express = require('express.io');
var app = express();
app.http().io();
// custome libs
var RequestUrl = require('./requestUrl');
var requestUrl = new RequestUrl();

// init
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.io.route('ready', function(req) {
    req.io.emit('talk', {
        message: 'Fetching data from CDNs....'
    })
    req.io.route('fetch');
});

app.io.route('fetch', function(req) {
  requestUrl.fetchContents({
    hostname: 'code.jquery.com',
    path: '/jquery-1.9.1.min.js'
  }, function(hostname, time) {
    var str = '<p>Total time taken to fetch file from ' + hostname + ' is ' + time + 'ms.</p>';
    req.io.emit('talk', {
      message: str
    });
  });
  requestUrl.fetchContents({
    hostname: 'ajax.googleapis.com',
    path: '/ajax/libs/jquery/1.9.1/jquery.min.js'
  }, function(hostname, time) {
    var str = '<p>Total time taken to fetch file from ' + hostname + ' is ' + time + 'ms.</p>';
    req.io.emit('talk', {
      message: str
    });
  });
  requestUrl.fetchContents({
    hostname: 'ajax.aspnetcdn.com',
    path: '/ajax/jQuery/jquery-1.9.1.min.js'
  }, function(hostname, time) {
    var str = '<p>Total time taken to fetch file from ' + hostname + ' is ' + time + 'ms.</p>';
    req.io.emit('talk', {
      message: str
    });
  });
});
