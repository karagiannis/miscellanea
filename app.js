

var url = process.argv[2] || "http://46.101.232.43/ ";

var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;

var p1 = loader(url)
                    .then(function(html){
                        //console.log(html);
                        return linkExtractor(html);
                    })
                    .then(function(links){
                      //console.log(links);
                      return(links);
                    });

Promise.all(url.concat(p1[0])).then(function(urlString){
                                  console.log(urlString);
                                  return linkExtractor(urlString)
                              });
