var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var ajaxConfig = {contentType:"application/json",
                  url:"http://46.101.232.43/cinema/check?day=03&movie=01",
                  query:""};

var ajaxConfig = {contentType:"application/x-www-form-urlencoded",
                  url:"http://46.101.232.43/dinner/login",
                  query:"username=zeke&password=coys&submit=login"};
                 ajaxConfig.query = "username=zeke&password=coys&submit=login";
                  //ajaxConfig.query = "username=zeke&password=coys";
                  //ajaxConfig.url = "http://46.101.232.43/dinner/login/booking";
                  //ajaxConfig.query = JSON.stringify(obj);
                  //ajaxConfig.contentType = "application/json";
                  //ajaxConfig.contentType = "text/html";
                  //ajaxConfig.contentType = "text/plain";
                  //"application/x-www-form-urlencoded"
                 ajaxConfig.contentType = "application/x-www-form-urlencoded";
var ajaxReq = require("./lib/ajaxNoPromise");
var arr = ajaxReq.post(ajaxConfig, function(error, data){
        if(error){
          //return throw new Error("Network error" +error);
          return console.log(error);
        }
        //data = JSON.parse(data);
        console.log(data);
        return data;
});

var requester = require("requester");
