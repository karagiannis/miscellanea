var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var ajaxConfig = {contentType:"application/json",
                  url:"http://46.101.232.43/cinema/check?day=03&movie=01",
                  query:""};


var ajaxReq = require("./lib/ajaxNoPromise");
var arr = ajaxReq.get(ajaxConfig, function(error, data){
        if(error){
          //return throw new Error("Network error" +error);
          return error;
        }
        data = JSON.parse(data);
        console.log(data);
        return data;
});
