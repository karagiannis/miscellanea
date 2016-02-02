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
          return reject(error);
        }
        if(response.statusCode !== 200){
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
