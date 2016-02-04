var FormData = require('form-data');
var request = require('request');

var form = new FormData();

form.append('username', 'zeke');
form.append('password', 'coys');
form.append('submit', 'login');

var http = require('http');

var request = http.request({
  method: 'post',
  host: '46.101.232.43',
  path: '/dinner/login',
  headers: form.getHeaders()
});

form.pipe(request);

request.on('response', function(res) {
  console.log(res.statusCode);
});
