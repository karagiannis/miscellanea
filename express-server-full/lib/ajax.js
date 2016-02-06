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
            if (req.status > 200){
              //console.log(req.status)
               return reject(req.status);
             }
            else {
              //console.log(req.responseText);
              //console.log(req.status);
              return resolve(req.responseText);
            }
          });
          //console.log("Before sending");
          req.open(config.method, config.url);
          req.setRequestHeader("Content-type", config.contentType);
        //req.setRequestHeader("Content-length", config.contentType.length);
          //req.setRequestHeader("Connection", "close");
          req.send(config.query);

   });
}

function get(config)
{
  config.method = "GET";
  //console.log("Insside get");
  return request(config);
}

function post(config)
{
  //console.log("Inside post");
  config.metod = "POST";
  return request(config);
}
