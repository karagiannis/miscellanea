var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {request: request,
                  get:get,
                 post: post}




function request(config)
{
  //console.log("inide request");
  //console.log("config", config);
   return new Promise(function(resolve,reject){
     var req = new XMLHttpRequest();


          req.addEventListener("load", function(){
              //console.log("Inside addEventlistener");
            if (req.status >= 400){
              console.log(req.status)
               return reject(req.status);
             }
            else {
              console.log(req.responseText);
              return resolve(req.responseText);
            }
          });
          console.log("Before sending");
          req.open(config.method, config.url);
          req.setRequestHeader("Content-type", config.contentType);
          req.send(config.query);

   });
}

function get(config)
{
  config.method = "GET";
  return request(config);
}

function post(config)
{
  console.log("Inside post");
  config.metod = "POST";
  return request(config);
}
