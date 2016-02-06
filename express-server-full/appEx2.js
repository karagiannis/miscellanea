
function extractTheMeetingDays(url, username, password){


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require("request");
var url = url || "http://46.101.232.43 ";
var username = username || "zeke";
var password = password || "coys";

var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;
var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;

//Hard code input values for checking the film availibility, for test
var day = "01";   //Friday = "01", Saturday = "02", Sunday = "03"
var movie = "01";  //Söderkåkar, film number one in the list


  //Load the html page of "http://46.101.232.43 "
  var mainPage = loader(url);

  //Extract all links from mainpage at http://46.101.232.43
  var mainPageLinks = mainPage.then(function(html){  //Get the main html page from input url
                      //console.log(html);
                        return linkExtractor(html);   //Extract all links
                    });

//Grab the Calendar subUrl and append it to http://46.101.232.43, giving http://46.101.232.43/calendar/
  var calendarBaseUrl = mainPageLinks.then(function(links){
                      //console.log(url.trim().concat(links[0]));
                      return(url.trim().concat(links[0]));          // Send them along untouched
                    });

//Grab the cinema subUrl and append it to http://46.101.232.43, giving http://46.101.232.43/cinema
  var cinemaUrl =  mainPageLinks.then(function(links){
                      //console.log(url.trim().concat(links[1]));
                      return(url.trim().concat(links[1]));

                    });
//Grab the restaurant subUrl and append it to http://46.101.232.43, giving http://46.101.232.43/dinner/
// THIS IS THE LOGIN URL
var restaurantUrl = mainPageLinks.then(function(links){
                    //console.log("restaurant url", url.trim().concat(links[2]));
                    return(url.trim().concat(links[2]));
                  });

//Load the html of the calendar base url. This one contains the links to Paul's, Peter's and Mary's calendars
var calendarPage = calendarBaseUrl.then(function(BaseUrl){
                        //console.log(BaseUrl);
                        return loader(BaseUrl);
                  });
//Grab the three subUrls to Paul, Peter and Mary
var calendarLinks = calendarPage.then(function(html){
                      //console.log(html);
                      return linkExtractor(html);   //Extract all links
                  });

  //Peter's calendar subUrl
  var PetersCalendarSubLink = calendarLinks.then(function(links){
                        //console.log("Peter sublink",links[1]);
                        return links[1].trim();
                  });

  //Paul's calendar subUrl
  var PaulsCalendarSubLink = calendarLinks.then(function(links){
                      //  console.log("Paul sublink",links[0]);
                        return links[0].trim();
                  });

  //Mary's calendar subUrl
  var MarysCalendarSubLink = calendarLinks.then(function(links){
                        //console.log("Mary sublink",links[2]);
                        return links[2].trim();
                  });


// Full link to Pauls calendar. http://46.101.232.43/calendar/paul.html
var PaulsFullCalendarUrl = Promise.all([calendarBaseUrl,PaulsCalendarSubLink])
                                    .then(function(results){
                                      //console.log("Paul ",results[0].concat("/").concat(results[1]));
                                      return results[0].concat("/").concat(results[1]);
                                    });

//Full link to Peter's calendar. http://46.101.232.43/calendar/peter.html
var PetersFullCalendarUrl = Promise.all([calendarBaseUrl,PetersCalendarSubLink])
                                      .then(function(results){
                                        //console.log("Peter ",results[0].concat("/").concat(results[1]));
                                        return results[0].concat("/").concat(results[1]);
                                      });
//Full link to Mary's calendar. http://46.101.232.43/calendar/mary.html
var MarysFullCalendarUrl = Promise.all([calendarBaseUrl,MarysCalendarSubLink])
                                    .then(function(results){
                                      //console.log("Mary", results[0].concat("/").concat(results[1]));
                                      return results[0].concat("/").concat(results[1]);
                                    });

//Peter's calendar:  Peter [ 'ok', '--', 'ok' ] menaning friday OK, saturday Not OK, Sunday OK
var PetersCalendar = PetersFullCalendarUrl.then(function(calendarUrl){
                                      return loader(calendarUrl);
                                    }).then(function(html){
                                      return okNotOkExtractor(html);
                                    }).then(function(calendar){
                                      //console.log("Peter", calendar);
                                      return calendar;
                                    });

//Paul's calendar:  Paul  [ 'ok', 'OK', '--' ]
var PaulsCalendar = PaulsFullCalendarUrl.then(function(calendarUrl){
                                    return loader(calendarUrl);
                                  }).then(function(html){
                                    return okNotOkExtractor(html);
                                  }).then(function(calendar){
                                    //console.log("Paul ",calendar);
                                    return calendar;
                                  });
// Mary's calendar:   Mary  [ 'ok', 'OK', '--' ]
var MarysCalendar = MarysFullCalendarUrl.then(function(calendarUrl){
                                      return loader(calendarUrl);
                                    }).then(function(html){
                                      return okNotOkExtractor(html);
                                    }).then(function(calendar){
                                      //console.log("Mary ",calendar);
                                      return calendar;
                                    });

//Used for converting integer value to string representing day, to be used with meetingDay routine
//var possibleDays = ["friday", "saturday", "sunday"];

//Should return the meeting day string
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
                                  //console.log("arr", arr);
                                  var str = "";
                                  for (var i = 0; i < arr.length; i++){
                                    if(arr[i] === true){
                                      str = "0" + i;
                                      //console.log("meetingDayString", str);
                                      break;
                                    }
                                  }
                                  var str = "01";
                                  //console.log("meetingDayString", str);
                                  //return str;
                                //console.log("arr", arr);
                                return arr;
                          });
            return meetingDay;
}
module.exports.extractTheMeetingDays = extractTheMeetingDays;

function extractMovieNames(meetingDayString,username, password ){

  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  var request = require("request");
  var url = url || "http://46.101.232.43 ";
  var username = username || "zeke";
  var password = password || "coys";

  var scraper = require("./lib/utility").scraper;

  //scraper(url);
  var loader = require("./lib/utility").promiseHtml;
  var linkExtractor = require("./lib/utility").linkExtractor;
  var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;


  //Load the html page of "http://46.101.232.43 "
  var mainPage = loader(url);

  //Extract all links from mainpage at http://46.101.232.43
  var mainPageLinks = mainPage.then(function(html){  //Get the main html page from input url
                      //console.log(html);
                        return linkExtractor(html);   //Extract all links
                    });

  //Grab the cinema subUrl and append it to http://46.101.232.43, giving http://46.101.232.43/cinema
  var cinemaUrl =  mainPageLinks.then(function(links){
                      //console.log(url.trim().concat(links[1]));
                      return(url.trim().concat(links[1]));

                    });


//setTimeout(function() { console.log("setTimeout: It's been one second!"); }, 2000);
//Loads the html of the cinema page
var cinemaHTML = cinemaUrl.then(function(urlCinema){
                            //console.log("urlCinema", urlCinema);
                            return loader(urlCinema);
                      });

var filmExtractor = require("./lib/utility").filmExtractor;

// Extracts the films showed at cinema:   Cinema films [ 'Söderkåkar', 'Fabian Bom', 'Pensionat Paradiset', '' ]
var cinemaFilms = cinemaHTML.then(function(html){
                            //console.log("cinema html", html)
                            return filmExtractor(html);
                      }).then(function(data){
                        //console.log("Cinema films", data);
                        return data;
                      });
      return cinemaFilms;

}
module.exports.extractMovieNames = extractMovieNames;

function extractMovieShowData(meetingDay, movie, username,password){



  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  var request = require("request");
  var url = url || "http://46.101.232.43 ";
  var username = username || "zeke";
  var password = password || "coys";

  var scraper = require("./lib/utility").scraper;

  //scraper(url);
  var loader = require("./lib/utility").promiseHtml;
  var linkExtractor = require("./lib/utility").linkExtractor;
  var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;


  //Load the html page of "http://46.101.232.43 "
  var mainPage = loader(url);

  //Extract all links from mainpage at http://46.101.232.43
  var mainPageLinks = mainPage.then(function(html){  //Get the main html page from input url
                      //console.log(html);
                        return linkExtractor(html);   //Extract all links
                    });

  //Grab the cinema subUrl and append it to http://46.101.232.43, giving http://46.101.232.43/cinema
  var cinemaUrl =  mainPageLinks.then(function(links){
                      //console.log(url.trim().concat(links[1]));
                      return(url.trim().concat(links[1]));

                    });


//setTimeout(function() { console.log("setTimeout: It's been one second!"); }, 2000);
//Loads the html of the cinema page
var cinemaHTML = cinemaUrl.then(function(urlCinema){
                            //console.log("urlCinema", urlCinema);
                            return loader(urlCinema);
                      });

var filmExtractor = require("./lib/utility").filmExtractor;

// Extracts the films showed at cinema:   Cinema films [ 'Söderkåkar', 'Fabian Bom', 'Pensionat Paradiset', '' ]
var cinemaFilms = cinemaHTML.then(function(html){
                            //console.log("cinema html", html)
                            return filmExtractor(html);
                      }).then(function(data){
                        //console.log("Cinema films", data);
                        return data;
                      });

// Old troubleshooting function. Prints out the cinema films array
var cinemaFilmsPrintOut = cinemaFilms.then(function(arr){
                                //console.log("List of films", arr);
                          });

//Using npm package xmlhttprequest, on the server side!!!!
var ajaxConfig = {contentType:"application/json",
                  url:"",
                  query:""};
var ajax = require("./lib/ajax");
//console.log("ajax", ajax);

// Returns an object with the avaibility of a certain film a certain day
//[ { status: 0, day: '01', time: '16:00', movie: '01' }, { status: 1, day: '01', time: '18:00', movie: '01' }, { status: 0, day: '01', time: '21:00', movie: '01' } ]
var availibleFilm = Promise.all([cinemaUrl, cinemaFilms, meetingDay]).then(function(results){
                            //console.log("results", results);
                            //console.log("ajaxconfig", ajaxConfig.url);
                            ajaxConfig.url = results[0] + "/check?day=" + results[2].trim() + "&movie=" + movie.trim();
                            //console.log("ajaxConfig.url", ajaxConfig.url);
                            return ajax.get(ajaxConfig);
                    }).then(function(JSONstr){
                      var obj = JSON.parse(JSONstr);
                      //console.log(obj);
                      return obj;
                    });

    return availibleFilm;

}
module.exports.extractMovieShowData = extractMovieShowData;

function extractAvailibleTables(username, password){

  //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  var request = require("request");
  var url = url || "http://46.101.232.43 ";
  var username = username || "zeke";
  var password = password || "coys";

  var scraper = require("./lib/utility").scraper;

  //scraper(url);
  var loader = require("./lib/utility").promiseHtml;
  var linkExtractor = require("./lib/utility").linkExtractor;
  var okNotOkExtractor = require("./lib/utility").okNotOkExtractor;

  //Hard code input values for checking the film availibility, for test
  //var day = "01";   //Friday = "01", Saturday = "02", Sunday = "03"
//  var movie = "01";  //Söderkåkar, film number one in the list


    //Load the html page of "http://46.101.232.43 "
    var mainPage = loader(url);

    //Extract all links from mainpage at http://46.101.232.43
    var mainPageLinks = mainPage.then(function(html){  //Get the main html page from input url
                        //console.log(html);
                          return linkExtractor(html);   //Extract all links
                      });

  //Grab the restaurant subUrl and append it to http://46.101.232.43, giving http://46.101.232.43/dinner/
  // THIS IS THE LOGIN URL
  var restaurantUrl = mainPageLinks.then(function(links){
                      //console.log("restaurant url", url.trim().concat(links[2]));
                      return(url.trim().concat(links[2]));
                    });


  var loginDetailsExtractor = require("./lib/utility").loginDetailsExtractor;
  //Used to extract the key value pairs, to be combined in the form POST : login details [ 'username', 'password', 'submit', 'login', '' ]
  //Will be the request package be encoded to "username=zeke&password=coys&submit=login"
  var loginDetails = restaurantUrl.then(function(restauranturl){
                          return loader(restauranturl);
                    }).then(function(htmlPage){
                          return(loginDetailsExtractor(htmlPage));
                    }).then(function(data){
                      //console.log("login details", data);
                      return data;
                    });



   var redirecter = require("./lib/utility").redirecter;


  //Does the post of username and password and recieves redirect url + cookie :
  // arr  [ 'login/booking"','"node_session_cookie=s%3AYoBMFVwmIi6kv6Xflm9lDWBwwy0qxlw6.wIScZN0zTaxoh6v2Jot3N02cNkv69I8zP7Dv4JMp8%2Fs; Path=/; HttpOnly"' ]
    var redirectedBookingSubUrlAndCookieEx = Promise.all([username,password,loginDetails,restaurantUrl]).then(function(results){
                      var username = results[0]; //zeke
                      var password = results[1]; //coys
                      var valueForSubmit = results[2][3]; // "login"
                      var urlForPOSTingLoginDetails = results[3] + "/login"; //http://46.101.232.43/dinner/login
                      return redirecter(username, password, valueForSubmit, urlForPOSTingLoginDetails);
                  }).then(function(redirectMessage){
                    //console.log("redirectMessage",redirectMessage);
                    var redirectArray = redirectMessage;
                    var messageWithSubUrlIncluded = redirectArray[0].split(" ");
                    var subUrl = messageWithSubUrlIncluded[messageWithSubUrlIncluded.length -1];
                    //console.log("Suburl NOW ", subUrl);
                    var messageWithCookieIncludedTemp = redirectArray[1].split("[")[1].split("]")[0];
                    //console.log("messageWithCookieIncludedTemp ", messageWithCookieIncludedTemp);
                    var arr = [];
                    arr[0]=subUrl;
                    arr[1] = messageWithCookieIncludedTemp;//The cookie
                    //console.log("arr ", arr);
                    return arr;
                  });

  var bookingsPageLoader = require("./lib/utility").bookingsPageLoader;

  //Loads the html of the restaurant bookings page
  var restaurantBookingHTML = Promise.all([restaurantUrl,redirectedBookingSubUrlAndCookieEx])
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

  //Extracts the availbe days and times for booking a table, as well as a special token csrf_token to be used when posting
  //availible Tables [ 'group1','fre1416','group1','fre1618','group1','fre1820','group1','lor1820',
                     //'group1','lor2022','group1','son1416','group1','son1618','group1','son1820',
                     //'group1','son2022','csrf_token','Jishgeny6753ydiayYHSjay0918','' ]
  var availibleTablesList = restaurantBookingHTML.then(function(html){
                                            //console.log(html);
                                                      return availibleTables(html);
                                                }).then(function(data){
                                                      //console.log("availible Tables", data);
                                                      return data;
                                                    });

                                var a =  Promise.all([restaurantUrl,redirectedBookingSubUrlAndCookieEx,availibleTablesList])
                                               .then(function(results){
                                                 return results;
                                               });
                                return a;


                                  //The above pattern does not work in the function below !?!?!
  };
module.exports.extractAvailibleTables = extractAvailibleTables;



function prepareForUserInput(timeString){

var loginDetailsExtractor = require("./lib/utility").loginDetailsExtractor;
//Used to extract the key value pairs, to be combined in the form POST : login details [ 'username', 'password', 'submit', 'login', '' ]
//Will be the request package be encoded to "username=zeke&password=coys&submit=login"
var loginDetails = restaurantUrl.then(function(restauranturl){
                        return loader(restauranturl);
                  }).then(function(htmlPage){
                        return(loginDetailsExtractor(htmlPage));
                  }).then(function(data){
                    //console.log("login details", data);
                    return data;
                  });



 var redirecter = require("./lib/utility").redirecter;

// var redirectedBookingSubUrlAndCookie = restaurantUrl.then(function(loginUrl){
//                   return redirecter("zeke", "coys", "login", loginUrl + "/login");
//               }).then(function(redirectMessage){
//                 console.log("redirectMessage",redirectMessage);
//                 var redirectArray = redirectMessage;
//                 var messageWithSubUrlIncluded = redirectArray[0].split(" ");
//                 var subUrl = messageWithSubUrlIncluded[messageWithSubUrlIncluded.length -1];
//                 //console.log("Suburl NOW ", subUrl);
//                 var messageWithCookieIncludedTemp = redirectArray[1].split("[")[1].split("]")[0];
//                 //console.log("messageWithCookieIncludedTemp ", messageWithCookieIncludedTemp);
//                 var arr = [];
//                 arr[0]=subUrl;
//                 arr[1] = messageWithCookieIncludedTemp;//The cookie
//                 return arr;
//               });



//Does the post of username and password and recieves redirect url + cookie :
// arr  [ 'login/booking"','"node_session_cookie=s%3AYoBMFVwmIi6kv6Xflm9lDWBwwy0qxlw6.wIScZN0zTaxoh6v2Jot3N02cNkv69I8zP7Dv4JMp8%2Fs; Path=/; HttpOnly"' ]
  var redirectedBookingSubUrlAndCookieEx = Promise.all([username,password,loginDetails,restaurantUrl]).then(function(results){
                    var username = results[0]; //zeke
                    var password = results[1]; //coys
                    var valueForSubmit = results[2][3]; // "login"
                    var urlForPOSTingLoginDetails = results[3] + "/login"; //http://46.101.232.43/dinner/login
                    return redirecter(username, password, valueForSubmit, urlForPOSTingLoginDetails);
                }).then(function(redirectMessage){
                  //console.log("redirectMessage",redirectMessage);
                  var redirectArray = redirectMessage;
                  var messageWithSubUrlIncluded = redirectArray[0].split(" ");
                  var subUrl = messageWithSubUrlIncluded[messageWithSubUrlIncluded.length -1];
                  //console.log("Suburl NOW ", subUrl);
                  var messageWithCookieIncludedTemp = redirectArray[1].split("[")[1].split("]")[0];
                  //console.log("messageWithCookieIncludedTemp ", messageWithCookieIncludedTemp);
                  var arr = [];
                  arr[0]=subUrl;
                  arr[1] = messageWithCookieIncludedTemp;//The cookie
                  //console.log("arr ", arr);
                  return arr;
                });

var bookingsPageLoader = require("./lib/utility").bookingsPageLoader;

//Loads the html of the restaurant bookings page
var restaurantBookingHTML = Promise.all([restaurantUrl,redirectedBookingSubUrlAndCookieEx])
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

//Extracts the availbe days and times for booking a table, as well as a special token csrf_token to be used when posting
//availible Tables [ 'group1','fre1416','group1','fre1618','group1','fre1820','group1','lor1820',
                   //'group1','lor2022','group1','son1416','group1','son1618','group1','son1820',
                   //'group1','son2022','csrf_token','Jishgeny6753ydiayYHSjay0918','' ]
var availibleTablesList = restaurantBookingHTML.then(function(html){
                                          //console.log(html);
                                                    return availibleTables(html);
                                              }).then(function(data){
                                                    //console.log("availible Tables", data);
                                                    return data;
                                                  });

                              var a =  Promise.all([meetingDay,cinemaUrl,cinemaFilms,availibleFilm,
                                                              restaurantUrl,redirectedBookingSubUrlAndCookieEx,availibleTablesList])
                                             .then(function(results){
                                               return results;
                                             });
                              return a;


                                //The above pattern does not work in the function below !?!?!
};

module.exports.prepareForUserInput = prepareForUserInput;

function BookATableAfterServerHasReceivedUserInput(fullBookingUrlString,CookieString, group,dayTimeStr,csrftoken){




return new Promise(function(resolve, reject){
//Books a table and receives a response html page from the server
   return Promise.resolve([fullBookingUrlString,CookieString, group,dayTimeStr,csrftoken])
                              .then(function(results){
                                var bookATable = require("./lib/utility").bookATable;
                                var fullBookingUrlString = results[0];
                                //console.log("fullBookingUrlString", fullBookingUrlString);
                                var CookieString = results[1];
                                //console.log("CookieString ", CookieString);
                                var group = results[2];
                                //console.log("group ", group);
                                var dayTimeStr = results[3];
                                //console.log("dayTimeStr ", dayTimeStr);
                                var csrftoken = results[4];
                                //console.log("csrftoken");
                                return bookATable(fullBookingUrlString,CookieString, group,dayTimeStr,csrftoken);

                              }).then(function(html){
                                //console.log("html", html);
                                return html;
                              }).then(function(html){
                                var bookingsResponser = require("./lib/utility").bookingsResponser;
                                return bookingsResponser(html);
                              }).then(function(greeting){
                                //setTimeout(function() { console.log("setTimeout: It's been one second!"); }, 2000);
                                //console.log(greeting);
                                return resolve(greeting);
                              });
                        //setTimeout(function() { console.log("setTimeout: It's been one second!"); }, 2000);

      });

}
module.exports.BookATableAfterServerHasReceivedUserInput = BookATableAfterServerHasReceivedUserInput;
