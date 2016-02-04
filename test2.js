var request = require("request");
var FormData = require('form-data');

var a = "username=zeke&password=coys&submit=login";
console.log("a",a);
console.log("a.length",a.length);

var r = request({
            method: 'POST',
            preambleCRLF: true,
            postambleCRLF: true,
            uri: 'http://46.101.232.43/dinner/login',
            multipart: [
              {
                'content-type': 'application/x-www-form-urlencoded',
                'content-length': 40,
                body: "username=zeke&password=coys&submit=login"
              }
                      ],
            function (error, response, body)
            {
                if (error)
                {
                  return console.error('upload failed:', error);
                }
                console.log(response);
                console.log('Upload successful!  Server responded with:', body);
            }
        });
