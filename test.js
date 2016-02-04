var FormData = require('form-data');
// var request = require('request');
//
// var form = new FormData();
//
// form.append('username', 'zeke');
// form.append('password', 'coys');
// form.append('submit', 'login');
//
// var http = require('http');
//
// var request = http.request({
//   method: 'post',
//   host: '46.101.232.43',
//   path: '/dinner/login',
//   headers: form.getHeaders()
// });
//
// form.pipe(request);
//
// request.on('response', function(res) {
//   console.log(res.statusCode);
// });

var http = require('http');
//var FormData = require('./');
var form = new FormData();

form.append('username', 'zeke');
form.append('password', 'coys');
form.append('submit', 'login');

// form.submit('http://46.101.232.43/dinner/login', function(err, res) {
//   console.log(res.statusCode);
//   res.resume();
// });

var http = require('http');

var request = http.request({
  method: 'post',
  host: '46.101.232.43',
  path: 'dinner/login',
  headers: form.getHeaders()
});

// form.submit('46.101.232.43/dinner/login', function(err, res) {
//   console.log(res.statusCode);
//   res.resume();
// });
form.submit('46.101.232.43/dinner/login', function(err, res) {
  console.log(res.statusCode);
});

 //form.pipe(request);
//
request.on('response', function( err,res) {
  if(err)
    return console.log(err);
  console.log(res.statusCode);
});

//Or if you would prefer the 'Content-Length' header to be set for you:

form.submit('46.101.232.43/dinner/login', function(err, res) {
  console.log(res.statusCode);
  res.resume();
});
