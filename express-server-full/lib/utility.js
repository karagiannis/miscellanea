"use strict";

var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

function scraper(url){
  console.log("Hello world");

}
module.exports.scraper = scraper;


function promiseHtml(url)
{
  return new Promise(function(resolve, reject)
  {
      request(url,function(error, response, html){
        if(error){
          console.log(error);
          return reject(error);
        }
        if(response.statusCode !== 200){
          console.log(response.statusCode);
          return reject(error);
        }
        return resolve(html);
      });
  });
}
module.exports.promiseHtml = promiseHtml;

function linkExtractor(htmlInput)
{
      return new Promise(function(resolve, reject){
          var cheerio = require("cheerio");
          var str = "";
          var arr = [];
          var $ = cheerio.load(htmlInput);
          var links = $("a"); // Jquery get all hyperlinks
          $(links).each(function(i, link){
            str += $(link).attr("href") + "\n";
          });
          if( str === "")
            return reject(error);
          else{
            return resolve(str.split("\n").filter(function(a){
                if(a.search("http") > -1  || a.search("/") > -1 || a.search("html") > -1)
                  return true;
                else
                  return false;
            }));
          }
    });
}
module.exports.linkExtractor = linkExtractor;

function parLinkExtractor(htmlInput)
{
      return new Promise(function(resolve, reject){
          var cheerio = require("cheerio");
          var str = "";
          var arr = [];
          var $ = cheerio.load(htmlInput);
          var links = $("a"); // Jquery get all hyperlinks
          $(links).each(function(i, link){
            str += $(link).attr("href") + "\n";
          });
          if( str === "")
            return reject(error);
          else{
            return resolve(str.split("\n").filter(function(a){
                if( a.search("/meps") > -1 )
                  return true;
                else
                  return false;
            }));
          }
    });
}
module.exports.parLinkExtractor = parLinkExtractor;

function okNotOkExtractor(htmlInput)
{
      return new Promise(function(resolve, reject){
          var cheerio = require("cheerio");
          var str = "";
          var arr = [];
          var $ = cheerio.load(htmlInput);
          var tableDatas = $("td"); // Jquery get all hyperlinks
          $(tableDatas).each(function(i, tableData){
            //console.log($(tableData).text() + ':\n  ' );
            str += $(tableData).text().trim() + "\n";
          });
          if( str === "")
            return reject(error);
          else{
            return resolve(str.split("\n").filter(function(a){
                if(a.search("ok") > -1  || a.search("--") > -1 || a.search("OK") > -1)
                  return true;
                else
                  return false;
            }));
          }
    });
}
module.exports.okNotOkExtractor = okNotOkExtractor;

function formInfoExtractor(htmlInput)
{   var fs = require("fs");
      return new Promise(function(resolve, reject){
          var cheerio = require("cheerio");
          var str = "";
          var arr = [];
          var $ = cheerio.load(htmlInput);
          var tableDatas = $("span[class='e']"); // Jquery get all hyperlinks
          $(tableDatas).each(function(i, tableData){
            //console.log($(tableData).text() + ':\n  ' );
            str += $(tableData).text().trim() + "\n";
          });
          if( str === "")
            return reject(error);
          else{
            return resolve(str.split("\n").map(function(a){
              var b = a.replace("[på]","@");
              fs.appendFile('message2.txt', b +" \n", (err) => {
                if (err) throw err;
                console.log(b +" \n");
                });
              return b;
            }));
          }
    });
}
module.exports.formInfoExtractor = formInfoExtractor;

function euMailExtractor(htmlInput)
{   var fs = require("fs");
      return new Promise(function(resolve, reject){
          var cheerio = require("cheerio");
          var str = "";
          var arr = [];
          var $ = cheerio.load(htmlInput);
          var tableDatas = $("a[class='link_email']"); // Jquery get all hyperlinks
          $(tableDatas).each(function(i, tableData){
            //console.log($(tableData).text() + ':\n  ' );
            str += $(tableData).attr("href").trim() + "\n";
          });
          if( str === "")
            return reject(error);
          else{
            return resolve(str.split("\n").map(function(a){
              var b = a.replace("[at]","@").replace("[dot]",".");
              var e = "";
              for (var i = b.length -1; i >=7; i--)
                e += b.charAt(i);
              fs.appendFile('message3.txt', e +" \n", (err) => {
                if (err) throw err;
                console.log(e +" \n");
                });
              return e;
            }));
          }
    });
}
module.exports.euMailExtractor = euMailExtractor;



function filmExtractor(htmlInput)
{
      return new Promise(function(resolve, reject){
          var cheerio = require("cheerio");
          var str = "";
          //console.log("Inside filmextractor");
          //console.log(htmlInput);
          var $ = cheerio.load(htmlInput);
          var spanList = $("option"); // Jquery get all td
          $(spanList).each(function(i, spanItem){
            //console.log($(spanItem).html() + ':\n  ' );
            str += $(spanItem).text().trim() + "\n";
          });
          if( str === "")
            return reject(error);
          else
          {
            return resolve(str.split("\n").filter(function(a)
                {
                  if( a.search("--") > -1  ||
                      a.toLowerCase().search("fredag") > -1   ||
                      a.toLowerCase().search("lördag") > -1   ||
                       a.toLowerCase().search("söndag") > -1)
                    return false;
                  else
                    return true;
                }));
          }
    });
}
module.exports.filmExtractor = filmExtractor;

function loginDetailsExtractor(htmlInput)
{
  return new Promise(function(resolve, reject){
      var cheerio = require("cheerio");
      var str = "";
      //console.log("Inside filmextractor");
      //console.log(htmlInput);
      var $ = cheerio.load(htmlInput);
      var spanList = $("input"); // Jquery get all td
      $(spanList).each(function(i, spanItem){
        //console.log($(spanItem).html() + ':\n  ' );
          str += $(spanItem).attr("name") +"\n"+$(spanItem).attr("value") +"\n";
      });
      if( str === "")
        return reject(error);
      else
      {
        return resolve(str.split("\n").filter(function(a){
            if (a === "undefined" || a === " "){
              return false;
            }
            else {
              return true;
            }

        }));
      }
   });
}
module.exports.loginDetailsExtractor = loginDetailsExtractor;

function bookingsResponser(htmlInput)
{
  //console.log(htmlInput);
  return new Promise(function(resolve, reject){
      var cheerio = require("cheerio");
      var str = "";
      //console.log("Inside filmextractor");
      //console.log(htmlInput);
      var str = cheerio.load(htmlInput)("h1").text().trim();

      if( str === "")
        return reject(error);
      else
        return resolve(str);
      });

}
module.exports.bookingsResponser = bookingsResponser;
//
// function filmAvailibility (url, selectedDay,selectedMovie){
//    console.log("url",url);
//    console.log("selectedDay",selectedDay);
//    console.log("selectedMovie",selectedMovie);
//   return new Promise(function(resolve, reject)
//   {
//     console.log("inside promise filma availibility");
//       var xhr = new XMLHttpRequest();
//       var str = "";
//            xhr.onreadystatechange = function ()
//            {
//                if (this.readyState === 4)
//                {
//
//                    var json = JSON.parse(this.responseText);
//
//                    if(json.length === 0)
//                    {
//                        return resolve("Filmen går ej denna dag");
//                    } else
//                    {
//                        message.innerHTML = "";
//                        json.forEach(function(current)
//                        {
//                          console.log(current);
//                          var time = current.time;
//                           var status = current.status === 0 ? "Fullbokad" : "Platser kvar" ;
//                           str += current.time + " : " +status +"<br />";
//                           console.log(str);
//                           return resolve(str);
//                        });
//                    }
//
//
//                }else (reject(error));
//
//            }
//            console.log("Sending xml request");
//            xhr.open("GET", url.concat("/check?day=") + selectedDay + "&movie=" + selectedMovie);
//            xhr.send();
//      });
// }
// module.exports.filmAvailibility = filmAvailibility;

var redirecter = function(userName, passWord, submit, loginUrl)
{
  return  new Promise(function(resolve, reject){
    var r = request.post({url:loginUrl,
                form: {username:userName,password:passWord,submit:submit}},
                      function(err,httpResponse,body)
                      {
                        if (err) {
                           return reject(console.error('upload failed:', err));
                         }
                         //console.log(httpResponse);
                         return resolve (( JSON.stringify(httpResponse) + body).split(",").filter(function(a){
                            //if(true)
                            if(a.match(/set-cookie/) || a.match(/Redirecting/))
                              return true;
                            else
                                return false;
                        }).filter(function(b){
                          if(b.match(/body/) || b.match(/set-cookie/))
                            return true;
                          else
                            false;
                        }));
                      });
            });
}
module.exports.redirecter = redirecter;

function bookingsPageLoader(options)
{
    return new Promise(function(resolve,reject){
        var r = request.get(options,function(error, response, body) {
          if (!error && response.statusCode == 200) {
            return resolve(body);
          }
          else{
            console.log("error", error);
            console.log("########################################");
            //console.log(response);
            return reject(error);
          }
        });

    });

}
module.exports.bookingsPageLoader = bookingsPageLoader;

function bookATable(url,cookie, group,dayTimeString,csrftoken)
{
    return new Promise(function(resolve,reject){
      var r = request.post({url:url.trim().replace(/['"]+/g, ''),
                form: {group1:dayTimeString,
                      csrf_token:csrftoken},
                headers: {
                  'User-Agent': 'request',
                  'cookie': cookie.replace(/['"]+/g, '').split()
                }},
                        function(err,httpResponse,body)
                        {
                          if (err) {
                              //console.error('upload failed:', err);
                              return reject(err);
                           }
                          // console.log(httpResponse);
                           //console.log('Upload successful!  Server responded with:', body);
                           return resolve(body);
                        });
    });

}
module.exports.bookATable = bookATable;



function availibleTables(htmlInput)
{
  return new Promise(function(resolve, reject){
      var cheerio = require("cheerio");
      var str = "";
      //console.log("Inside filmextractor");
      //console.log(htmlInput);
      var $ = cheerio.load(htmlInput);
      var spanList = $("input"); // Jquery get all td
      $(spanList).each(function(i, spanItem){
        //console.log($(spanItem).html() + ':\n  ' );
          str += $(spanItem).attr("name") +"\n"+$(spanItem).attr("value") +"\n";
      });
      if( str === "")
        return reject(error);
      else
      {
        return resolve(str.split("\n"));
      }
    });

}
module.exports.availibleTables = availibleTables;
