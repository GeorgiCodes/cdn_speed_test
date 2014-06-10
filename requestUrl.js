var http = require('http');

var RequestUrl = function(options) {
  this.options = options || {
    hostname: 'code.jquery.com',
    path: '/jquery-1.9.1.min.js'
  };
};

RequestUrl.prototype.fetchContents = function() {
  var me = this;
  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(str);
    });
  }

  var req = http.request(me.options, callback);
  req.write("hello world!");
  req.end();
};

module.exports = RequestUrl;
