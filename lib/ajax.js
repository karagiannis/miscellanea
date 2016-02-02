module.exports = {request: request,
                  get:get,
                 post: post}




function request(config)
{
  console.log("inide request");
  console.log("config", config);
   return new Promise(function(resolve,reject){
     console.log("Inide promise NOW ajax");
     var req = new XMLHttpRequest();
     console.log("reqester", req);
     req.open(config.method, config.url);
     req.setRequestHeader("Content-type", config.contentType);
     req.send();

     req.upload.addEventListener("progress", function(){
          console.log("progress");
     });
          req.addEventListener("load", function(){
              console.log("Inside addEventlistener");
            if (req.status >= 400)
              reject(req.status);
            else {
              resolve(req.response);
            }
          });
          console.log("Before sending");

   });
}

function get(config)
{
  config.method = "GET";
  return request(config);
}

function post(config)
{
  config.metod = "POST";
  return request(config);
}
