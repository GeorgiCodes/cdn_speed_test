var http = require('http');

var RequestUrl = function() {
};

RequestUrl.prototype.fetchContents = function(options, cb) {

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      var time = new Date() - start;
      console.log('Total time taken to fetch file from %s is %d ms', options.hostname, time);
      return cb(options.hostname, time);
    });
  }

  var start = new Date();
  var req = http.request(options, callback);
  req.end();
};

module.exports = RequestUrl;
