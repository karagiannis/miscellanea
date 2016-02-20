var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require("request");
var url = url || "http://www.europarl.europa.eu/meps/en/full-list.html?filter=all&leg=";
var fs = require("fs");

var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;
var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;
var formInfoExtractor = require("./lib/utility").formInfoExtractor;

var parLinkExtractor = require("./lib/utility").parLinkExtractor;

  var mainPage = loader(url);

var linksArray = mainPage.then(function(html){
              //console.log(html);
              return html;
            }).then(function(html){
              return parLinkExtractor(html);
            }).then(function(data){
            //  console.log(data);
              return data;
            }).then(function(links){
              var a = links.filter(function(b){
                if( b.search(".html") > -1 )
                  return true;
                else
                  return false;
              });
              //console.log(a);
              return a;
            }).then(function(data){
              var a = data.filter(function(b){
                  if( b.search("session") > -1 || b.search("/search") > -1
                 ||   b.search("filter") > -1 //|| b.search("/index.html") > -1
                 || b.search("/map.html") > -1 || b.search("incoming-outgoing.html") > -1
                 || b.search("full-list.html") > -1 || b.search("/directory.html") > -1)
                    return false;
                  else
                    return true;
                  });//filter
                  //console.log(a);
                  return a;
              }).then(function(data){
                              var i = 0;
                              var c = data.slice(2, data.length-1);
                              //console.log(c);
                              var b = c.filter(function(a){
                                i++;
                                //console.log(i);
                                if(i % 2 == 0)
                                  return true;
                                  else return false;
                              });
                              //console.log(b);
                              return b;
                            }).then(function(a){
                              var b = a.map(function(c){
                                return "http://www.europarl.europa.eu"+c;
                              });
                              console.log(b);
                              return b;
                            });
 //
 // var pages = linksArray.then(function(arr){
 //        return arr.map(function(link) {
 //                  return loader(link.replace(/^\s*|\s*$/g, ''));
 //                  });
 //              }).then(function(data){
 //                console.log(data);
 //                return data;
 //              });
//
// var pages = linksArray.then(function(arr){
//   return arr.reduce(function(item) {
//     var options = {
//             url: item.replace(/^\s*|\s*$/g, ''),
//             port: 80,
//             method: 'GET'
//           };
//           //console.log(options.url);
//         return loader(options);
//       })}).then(function(data){
//         console.log(data);
//         return data;
//       });
var euMailExtractor = require("./lib/utility").euMailExtractor
var pages = linksArray.then(function (arr) {
    var pArray = [];
    var eArray = [];
    return arr.reduce(function (promise, link) {
        var ret = promise.then(function() {
            return loader(link)
             // the next 3 lines will ensure all links are processed - any failed links will resolve with a value == false
            .catch(function(err) {
                return false;
            });
        });
        pArray.push(ret);
        // next three lines log when each loader has finished
        var a = ret.then(function(b) {
            return euMailExtractor(b);
            console.log('finished', link);
        }).then(function(c){
           console.log(c);
           eArray.push(c);
        });
        return ret;
    }, Promise.resolve())
    .then(function() {
        return Promise.all([pArray,eArray]);
    });
})
pages.then(function (data) {
    // data is an array of results of loader
    console.log(data);
}).catch(function(err) { // any errors should be logged here
    console.log(err);
});
//<a id="email-0" class="link_email" href="mailto:lars.adaktusson@euparl.europa.eu"
