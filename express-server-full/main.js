
var prepareForUserInput = require("./appEx").prepareForUserInput;
var BookATableAfterServerHasReceivedUserInput = require("./appEx").BookATableAfterServerHasReceivedUserInput;

var dataOnCalendarsMoviesAndRestaurantBookingInfo = prepareForUserInput()
                                                    .then(function(data){
                                                      console.log(data);
                                                      return data;
                                                    });

var Days = ["friday", "saturday", "sunday"];

//possibleDays  [ true, false, false ]
var possibleDays = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                      var possibleDays = results[0];
                                      //console.log("possibleDays ", possibleDays);
                                      return possibleDays;
                                      });

//moviesOnCinema  [ 'Söderkåkar', 'Fabian Bom', 'Pensionat Paradiset', '' ]
var moviesOnCinema = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                       var moviesOnCinema = results[2];
                                       //console.log("moviesOnCinema ",moviesOnCinema);
                                       return moviesOnCinema;
                                      });

//timeTableMovies  [ { status: 0, day: '01', time: '16:00', movie: '01' },
//  { status: 1, day: '01', time: '18:00', movie: '01' },
//  { status: 0, day: '01', time: '21:00', movie: '01' } ]
var timeTableMovies = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                       var timeTableMovies = results[3];
                                       //console.log("timeTableMovies ",timeTableMovies);
                                       return timeTableMovies;
                                      });

//restaurantBaseUrl http://46.101.232.43/dinner
var restaurantBaseUrl  = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                       var restaurantBaseUrl = results[4];
                                       //console.log("restaurantBaseUrl",restaurantBaseUrl);
                                       return restaurantBaseUrl;
                                      });

//reDirectSubUrl  login/booking
 var reDirectSubUrl = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                        var reDirectSubUrl = results[5][0].trim().replace(/['"]+/g, '');
                                        //console.log("reDirectSubUrl ",reDirectSubUrl);
                                        return reDirectSubUrl;
                                      });

//sessionCookie  node_session_cookie=s%3Atbf6nrG6JNsmQsvoSWlx7ng5e3dO0NlO.JcTGCc6ujWdKIFgNFrGeKTiXcMqIeMykFrolN9O9rE0; Path=/; HttpOnly
var sessionCookie = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                        var sessionCookie = results[5][1].trim().replace(/['"]+/g, '');
                                        //console.log("sessionCookie ",sessionCookie);
                                        return sessionCookie;
                                      });

//groupDetailForTabelBooking [ 'group1','fre1416','group1','fre1618','group1','fre1820','group1',
//'lor1820','group1','lor2022','group1','son1416','group1','son1618',
//'group1','son1820','group1','son2022','csrf_token','Jishgeny6753ydiayYHSjay0918','' ]
var groupDetailForTabelBooking = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                      var groupDetailForTabelBooking= results[6];
                                      //console.log("groupDetailForTabelBooking", groupDetailForTabelBooking);
                                      return groupDetailForTabelBooking;
                                      });
//groupID group1
var groupID =   dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                      var groupID = results[6][0];
                                      //console.log("groupID", groupID);
                                      return groupID;
                                      });

//availibleTableFriday [ 'fre1416', 'fre1618', 'fre1820' ]
var availibleTableFriday = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                      var availibleTableFriday = results[6].filter(function(a){
                                              if(a.match(/fre/))
                                                return true;
                                              else
                                                return false;
                                              });
                                              //console.log("availibleTableFriday", availibleTableFriday);
                                              return availibleTableFriday;
                                      });

//availibleTableSaturday [ 'lor1820', 'lor2022' ]
var availibleTableSaturday = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                          var availibleTableSaturday = results[6].filter(function(a){
                                              if(a.match(/lor/))
                                                return true;
                                              else
                                                return false;
                                              });
                                              //console.log("availibleTableSaturday", availibleTableSaturday);
                                              return availibleTableSaturday;
                                       });

//availibleTableSunday [ 'son1416', 'son1618', 'son1820', 'son2022' ]
var availibleTableSunday = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                          var availibleTableSunday = results[6].filter(function(a){
                                              if(a.match(/son/))
                                                 return true;
                                              else
                                                return false;
                                              });
                                              //console.log("availibleTableSunday", availibleTableSunday);
                                              return availibleTableSunday;
                                       });

//csrfString Jishgeny6753ydiayYHSjay0918
var csrfString = dataOnCalendarsMoviesAndRestaurantBookingInfo.then(function(results){
                                          var csrfString = results[6][results[6].length -2];
                                          //console.log("csrfString", csrfString);

                                          return csrfString;
                                    });

var dayTimeStringBooking = 'son1618';

       var booking = Promise.all([restaurantBaseUrl, reDirectSubUrl,sessionCookie,
                                groupID, dayTimeStringBooking,csrfString ])
                            .then(function(results){
                                    var fullbookingsUrl = results[0] + "/" + results[1];
                                    //console.log("fullbookingsUrl ", fullbookingsUrl);
                                    var cookie = results[2];
                                    //console.log("cookie", cookie);
                                    var groupID = results[3];
                                  //  console.log("groupID ",groupID);
                                    var dayTimeStringBooking = results[4];
                                    //console.log("dayTimeStringBooking ", dayTimeStringBooking);
                                    var csrfString = results[5];
                                    //console.log("csrfString", csrfString);
                            return BookATableAfterServerHasReceivedUserInput(fullbookingsUrl,cookie,groupID,dayTimeStringBooking,csrfString);
                          }).then(function(data){
                              console.log(data);
                              return data;
                          });
