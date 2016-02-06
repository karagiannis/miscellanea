var request = require("request");
//var FormData = require('form-data');

// var a = "username=zeke&password=coys&submit=login";
// console.log("a",a);
// console.log("a.length",a.length);
// "http://46.101.232.43/dinner/login";

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

var redirect = new Promise(function(resolve, reject){
  var r = request.post({url:"http://46.101.232.43/dinner/login",
              form: {username:'zeke',password:"coys",submit:"login"}},
                    function(err,httpResponse,body)
                    {
                      if (err) {
                         return reject(console.error('upload failed:', err));
                       }
                       //console.log(httpResponse);
                       return resolve( body);
                    });

}).then(function(data){
  var dataToArray = data.split(" ");
  var subUrl = dataToArray[dataToArray.length -1];
  console.log(subUrl);
});
