var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = {
  request:request,
  post:post,
  get:get
}

function request(config, callback){
  config.method = config.method || "GET";
  config.url = config.url || "";
  config.contentType = config.contentType || "application/json";
   var req;
  // req = new XMLHttpRequest();
      req = new XMLHttpRequest();
  req.addEventListener("load", function(){
    if(req.status >= 400){
      callback(req.status);
    }
    callback(null, req.responseText);
  });
  req.open(config.method, config.url);
  req.setRequestHeader("Content-type", config.contentType);
  req.send(config.query);
}
function post(config, callback){
  config.method = "POST";
  request(config,callback);
}

function get(config, callback){
  config.method = "GET";
  request(config, callback);
}
