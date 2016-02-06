var request = require('request');

var options = {
  url: 'http://46.101.232.43/dinner/login/booking',
  headers: {
    'User-Agent': 'request',
    'cookie': [ 'node_session_cookie=s%3A9kIZTMIJBpw-xVZt5CvEvNXNLgl2b_uz.vdg4dgnF0q36xc%2BJxrAHbqahIyi6X3Cr5PVAoOX9wXY; Path=/; HttpOnly' ]
  }
};
//
// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body);
//   }
//   else{
//     console.log("error", error);
//     console.log("########################################");
//     console.log(response)
//   }
// }
//
// request.get(options, callback);
//
// var request = require("request");
// var FormData = require('form-data');
//
// var a = "username=zeke&password=coys&submit=login";
// console.log("a",a);
// console.log("a.length",a.length);
// "http://46.101.232.43/dinner/login";
//
// var r = request.post({url:"http://46.101.232.43/dinner/login",
//           form: {username:'zeke',password:"coys",submit:"login"}},
//                   function(err,httpResponse,body)
//                   {
//                     if (err) {
//                        return console.error('upload failed:', err);
//                      }
//                      console.log(httpResponse);
//                      console.log('Upload successful!  Server responded with:', body);
//                   });
                  // group1:son1618
                  // csrf_token:Jishgeny6753ydiayYHSjay0918

var r = request.post({url:"http://46.101.232.43/dinner/login/booking",
          form: {group1:'son1618',csrf_token:"Jishgeny6753ydiayYHSjay0918"},
          headers: {
            'User-Agent': 'request',
            'cookie': [ 'node_session_cookie=s%3AAgo-iY_q3FmbEiA01nrEEkV48rlJ6mYI.HlCJ1pjgTQ18mH8fjDjnCs%2Bq%2BAK1q%2Bk%2BHMv4k4RVKjU' ]
          }},
                  function(err,httpResponse,body)
                  {
                    if (err) {
                       return console.error('upload failed:', err);
                     }
                     console.log(httpResponse);
                     console.log('Upload successful!  Server responded with:', body);
                  });
