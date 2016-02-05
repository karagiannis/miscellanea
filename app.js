var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require("request");
var url = process.argv[2] || "http://46.101.232.43 ";
var username = process.argv[3] || "zeke";
var password = process.argv[4] || "coys";

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
                    //console.log("restaurant url", url.trim().concat(links[2]));
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
var loginDetailsExtractor = require("./lib/utility").loginDetailsExtractor;
var loginDetails = restaurantUrl.then(function(restauranturl){
                        return loader(restauranturl);
                  }).then(function(htmlPage){
                        return(loginDetailsExtractor(htmlPage));
                  }).then(function(data){
                    //console.log("login details", data);
                  });

  // var redirect = new Promise(function(resolve, reject){
  //   var r = request.post({url:"http://46.101.232.43/dinner/login",
  //               form: {username:'zeke',password:"coys",submit:"login"}},
  //                     function(err,httpResponse,body)
  //                     {
  //                       if (err) {
  //                          return reject(console.error('upload failed:', err));
  //                        }
  //                        //console.log(httpResponse);
  //                        return resolve( body);
  //                     });
  //
  // }).then(function(data){
  //   var dataToArray = data.split(" ");
  //   var subUrl = dataToArray[dataToArray.length -1];
  //   //console.log(subUrl);
  // });


 var redirecter = require("./lib/utility").redirecter;

var redirectedBookingSubUrlAndCookie = restaurantUrl.then(function(loginUrl){
                  return redirecter("zeke", "coys", "login", loginUrl + "/login");
              }).then(function(redirectMessage){
                //console.log(redirectMessage);
                var redirectArray = redirectMessage;
                var messageWithSubUrlIncluded = redirectArray[0].split(" ");
                var subUrl = messageWithSubUrlIncluded[messageWithSubUrlIncluded.length -1];
                //console.log("Suburl NOW ", subUrl);
                var messageWithCookieIncludedTemp = redirectArray[1].split("[")[1].split("]")[0];
                //console.log("messageWithCookieIncludedTemp ", messageWithCookieIncludedTemp);
                var arr = [];
                arr[0]=subUrl;
                arr[1] = messageWithCookieIncludedTemp;//The cookie
                return arr;
              });
var bookingsPageLoader = require("./lib/utility").bookingsPageLoader;
var restaurantBookingHTML = Promise.all([restaurantUrl,redirectedBookingSubUrlAndCookie])
                                       .then(function(results){
                                         //console.log("results", results);
                                         var fullBookingUrlString = results[0]+"/"+results[1][0];
                                         var CookieString = results[1][1];
                                         //console.log("fullBookingUrlString  ",fullBookingUrlString);

                                         var options = {
                                           url: fullBookingUrlString.trim().replace(/['"]+/g, ''),  //taking away double quotes
                                           headers: {
                                             'User-Agent': 'request',
                                             'cookie': CookieString.replace(/['"]+/g, '').split()
                                           }
                                         };
                                        // console.log("options.url", options.url);
                                        // console.log(options.headers.cookie);
                                         return bookingsPageLoader(options);
                                      }).then(function(html){
                                        return html;
                                      });

var availibleTables = require("./lib/utility").availibleTables;

var availibleTablesList = restaurantBookingHTML.then(function(html){
                                          //console.log(html);
                                                    return availibleTables(html);
                                              }).then(function(data){
                                                    console.log(data);
                                                    return data;
                                                  });

var bookATable = rquire("./lib/utility").bookATable;
//bookATable(url,cookie, group,dayTimeString,csrftoken)
var dayTimeString = son1618;

var bookingATableNow = Promise.all([redirectedBookingSubUrlAndCookie,availibleTablesList,dayTimeString])
                              .then(function(results){
                                
                              });
