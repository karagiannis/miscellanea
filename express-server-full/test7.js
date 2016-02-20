var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require("request");
var url = url || "http://www.riksdagen.se/sv/ledamoter-partier/Hitta-ledamot/Bokstavsordning/";


var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;
var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;
var formInfoExtractor = require("./lib/utility").formInfoExtractor



  var mainPage = loader(url);

var htmlData = mainPage.then(function(html){
              console.log(html);
              return html;
            }).then(function(html){
              return formInfoExtractor(html);
            }).then(function(formdata){
              console.log(formdata);
            });
