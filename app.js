var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var url = process.argv[2] || "http://46.101.232.43 ";

var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;
var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;




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
                        //console.log(BaseUrl);
                        return loader(BaseUrl);
                  });

  var calendarLinks = calendarPage.then(function(html){
                      //console.log(html);
                      return linkExtractor(html);   //Extract all links
                  });
  var PetersCalendarSubLink = calendarLinks.then(function(links){
                        //console.log("Peter sublink",links[1]);
                        return links[1].trim();
                  });
  var PaulsCalendarSubLink = calendarLinks.then(function(links){
                      //  console.log("Paul sublink",links[0]);
                        return links[0].trim();
                  });
  var MarysCalendarSubLink = calendarLinks.then(function(links){
                        //console.log("Mary sublink",links[2]);
                        return links[2].trim();
                  });

  var PetersFullCalendarUrl = Promise.all([calendarBaseUrl,PetersCalendarSubLink])
                                      .then(function(results){
                                        //console.log("Peter ",results[0].concat("/").concat(results[1]));
                                        return results[0].concat("/").concat(results[1]);
                                      });

var PaulsFullCalendarUrl = Promise.all([calendarBaseUrl,PaulsCalendarSubLink])
                                    .then(function(results){
                                      //console.log("Paul ",results[0].concat("/").concat(results[1]));
                                      return results[0].concat("/").concat(results[1]);
                                    });
var MarysFullCalendarUrl = Promise.all([calendarBaseUrl,MarysCalendarSubLink])
                                    .then(function(results){
                                      //console.log("Mary", results[0].concat("/").concat(results[1]));
                                      return results[0].concat("/").concat(results[1]);
                                    });

  var PetersCalendar = PetersFullCalendarUrl.then(function(calendarUrl){
                                      return loader(calendarUrl);
                                    }).then(function(html){
                                      return okNotOkExtractor(html);
                                    }).then(function(calendar){
                                      //console.log("Peter", calendar);
                                      return calendar;
                                    });

var PaulsCalendar = PaulsFullCalendarUrl.then(function(calendarUrl){
                                    return loader(calendarUrl);
                                  }).then(function(html){
                                    return okNotOkExtractor(html);
                                  }).then(function(calendar){
                                    //console.log("Paul ",calendar);
                                    return calendar;
                                  });

  var MarysCalendar = MarysFullCalendarUrl.then(function(calendarUrl){
                                      return loader(calendarUrl);
                                    }).then(function(html){
                                      return okNotOkExtractor(html);
                                    }).then(function(calendar){
                                      //console.log("Mary ",calendar);
                                      return calendar;
                                    });
var possibleDays = ["friday", "saturday", "sunday"];
var meetingDay = Promise.all([PetersCalendar,PaulsCalendar,MarysCalendar])
                          .then(function(calendars){
                                  var arr = [];
                                  var meet = true;
                                  for (var i = 0; i < calendars.length; i++){
                                        for(var j = 0; j < calendars[i].length; j++){
                                               meet= meet && (calendars[j][i] === "ok" || calendars[j][i] === "OK");
                                               arr[i] = meet;
                                        }
                                  }
                                  //console.log("meeting day", arr);
                                  arr.forEach(function(elem, i){
                                    if(elem)
                                      //console.log("Possible meeting day",possibleDays[i] );
                                      console.log("");
                                  });
                                return arr;
                          });

var cinemaHTML = cinemaUrl.then(function(urlCinema){
                            //console.log("urlCinema", urlCinema);
                            return loader(urlCinema);
                      });

var filmExtractor = require("./lib/utility").filmExtractor;
var cinemaFilms = cinemaHTML.then(function(html){
                            //console.log("cinema html", html)
                            return filmExtractor(html);
                      });
var cinemaFilmsPrintOut = cinemaFilms.then(function(arr){
                                //console.log("List of films", arr);
                          });
var filmAvailibility = require("./lib/utility").filmAvailibility;
var ajaxConfig = {contentType:"application/json",
                  url:"",
                  query:""};
  var ajax = require("./lib/ajax");
var availibleFilm = Promise.all([cinemaUrl, cinemaFilms]).then(function(results){
                            //console.log("results", results);
                            ajaxConfig.url = results[0] + "/check?day=" + "01" + "&movie=" + "01";
                            //console.log("ajaxConfig.url", ajaxConfig.url);
                            return ajax.get(ajaxConfig);
                    }).then(function(str){
                      //console.log(str);
                    });
//username=zeke&password=coys&submit=login
//Content-Type: application/x-www-form-urlencoded

var obj = {username:"zeke", password:"coy"};
  var ajaxConfig = {contentType:"application/x-www-form-urlencoded",
                    url:"http://46.101.232.43/dinner/login",
                    query:"username=zeke&password=coys&submit=login"};
                   ajaxConfig.query = "username=zeke&password=coys&submit=login";
                    //ajaxConfig.query = "username=zeke&password=coys";

                    //ajaxConfig.query = JSON.stringify(obj);
                    //ajaxConfig.contentType = "application/json";
                    ajaxConfig.contentType = "text/html";
                    //ajaxConfig.contentType = "text/plain";
                    //"application/x-www-form-urlencoded"
                  //  ajaxConfig.contentType = "application/x-www-form-urlencoded";
ajax.post(ajaxConfig).then(function(data){
                      console.log(data);
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
