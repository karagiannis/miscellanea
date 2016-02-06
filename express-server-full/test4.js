var request = require('request');

var options = {
  url: 'http://46.101.232.43/dinner/login/booking',
  headers: {
    'User-Agent': 'request',
    'cookie': [ 'node_session_cookie=s%3A9kIZTMIJBpw-xVZt5CvEvNXNLgl2b_uz.vdg4dgnF0q36xc%2BJxrAHbqahIyi6X3Cr5PVAoOX9wXY; Path=/; HttpOnly' ]
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
  else{
    console.log("error", error);
    console.log("########################################");
    console.log(response)
  }
}

request.get(options, callback);
