

var url = process.argv[2] || "http://46.101.232.43 ";

var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;



  var mainPage = loader(url);
  var mainPageLinks = mainPage.then(function(html){  //Get the main html page from input url
                      //  console.log(html);
                        return linkExtractor(html);   //Extract all links
                    });

  var calendarBaseUrl = mainPageLinks.then(function(links){
                      //console.log(url.trim().concat(links[0]));
                      return(url.trim().concat(links[0]));          // Send them along untouched
                    });
  var cinemaUrl =  mainPageLinks.then(function(links){
                      //console.log(url.trim().concat(links[1]));
                      return(url.trim().concat(links[1]));

                    });

var restaurantUrl = mainPageLinks.then(function(links){
                    //console.log(url.trim().concat(links[2]));
                    return(url.trim().concat(links[2]));
                  });

  var calendarPage = calendarBaseUrl.then(function(BaseUrl){
                        console.log(BaseUrl);
                        return loader(BaseUrl);
                  });

  var calendarLinks = calendarPage.then(function(html){
                      console.log(html);
                      return linkExtractor(html);   //Extract all links
                  });
  var PetersCalendarSubLink = calendarLinks.then(function(links){
                        console.log(links[0]);
                        return links[0].trim();
                  });
  var PaulsCalendarSubLink = calendarLinks.then(function(links){
                        console.log(links[1]);
                        return links[1].trim();
                  });
  var MarysCalendarSubLink = calendarLinks.then(function(links){
                        console.log(links[2]);
                        return links[2].trim();
                  });

  var PetersFullCalendarUrl = Promise.all([calendarBaseUrl,PetersCalendarSubLink])
                                      .then(function(results){
                                        console.log(results[0].concat("/").concat(results[1]));
                                        return results[0].concat(results[1]);
                                      });



                    // .then(function(arrayOfLinksMainPage){      //H
                    //   this.calendarBaseUrl = url.trim().concat(arrayOfLinksMainPage[0]);
                    //   this.cinemaUrl = url.trim().concat(arrayOfLinksMainPage[1]);
                    //   this.restaurantUrl = url.trim().concat(arrayOfLinksMainPage[2]);
                    //
                    //   console.log(url.trim().concat(arrayOfLinksMainPage[0])); //Print out the url + the substring which is the link to the calendar page
                    //   return loader(url.trim().concat(arrayOfLinksMainPage[0]));  //load the calendar page
                    // })
                    // .then(function(html){
                    //   //console.log(html);      //Print out the calendar page
                    //   return linkExtractor(html);
                    // })
                    // .then(function(arrayofLinksToCalendars){    //Extract the links to each calendar of each friend
                    //   console.log("arrayofLinksToCalendars ", arrayofLinksToCalendars);
                    //   this.arrayofLinksToCalendars = arrayofLinksToCalendars;  //Store the links to each calendar
                    //   console.log(url.trim().concat("/").concat( arrayofLinksToCalendars[0]));
                    //   return (load(url.trim().concat("/").concat( arrayofLinksToCalendars[0])));
                    // })
                    // .then(function(petersCalendarHtmlPage){
                    //   console.log(petersCalendarHtmlPage);
                    //   console.log("this.arrayOfLinksMainPage", this.arrayOfLinksMainPage);
                    //   console.log("this.calendarBaseUrl", this.calendarBaseUrl);
                    //   console.log("this.cinemaUrl", this.cinemaUrl);
                    //   console.log("this.arrayofLinksToCalendars", this.arrayofLinksToCalendars);
                    // });
                    //

// Promise.all(p1).then(function(arr){
//                                   console.log(arr[0]);
//                                   return linkExtractor(url.concat(arr[0]));
//                               });
