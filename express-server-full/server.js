var extractTheMeetingDays = require("./appEx2").extractTheMeetingDays;
var extractMovieNames = require("./appEx2").extractMovieNames;
var extractMovieShowData = require("./appEx2").extractMovieShowData;
var extractAvailibleTables = require("./appEx2").extractAvailibleTables;
var BookATableAfterServerHasReceivedUserInput = require("./appEx2").BookATableAfterServerHasReceivedUserInput;


var meetingDay = extractTheMeetingDays().then(function(arr){
                        //console.log("arr", arr);
                        var str ="";
                        for (var i = 0; i < 3; i++){
                           if(arr[i]){
                              str = "0" + (i +1).toString();
                              break;
                           }
                        }
                        //console.log("meetingday ", str);
                        return str;
                  });

var onGoingMovies = meetingDay.then(function(dayStr){
                        return extractMovieNames(dayStr);
                  }).then(function(data){
                      //console.log(data);
                      return data;
                  });

var cinemaDataMovie1 = meetingDay.then(function(dayStr){
                   return extractMovieShowData(dayStr,"01");
              }).then(function(data){
                  //console.log("film1data1 ", data);
                  return data;
              });

var cinemaDataMovie2 = Promise.all([meetingDay, cinemaDataMovie1]).then(function(results){
                   var dayStr = results[0];
                   return extractMovieShowData(dayStr,"02");
              }).then(function(data){
                  //console.log("film1data2 ", data);
                  return data;
              });

var cinemaDataMovie3 = Promise.all([meetingDay,cinemaDataMovie1, cinemaDataMovie2 ]).then(function(results){
                   var dayStr = results[0];
                   return extractMovieShowData(dayStr,"03");
              }).then(function(data){
                  //console.log("film1data3 ", data);
                  return data;
              });

var availibelTablesList = extractAvailibleTables().then(function(resultList){
                          //console.log(resultList);
                          return resultList;
                });

//var tableBookingStarted = true:
//var dayTimeString = "lor1820";

//Extracting data from availibelTablesList

//restaurantBaseUrl http://46.101.232.43/dinner
var restaurantBaseUrl  = availibelTablesList.then(function(results){
                                       var restaurantBaseUrl = results[0];
                                       //console.log("restaurantBaseUrl",restaurantBaseUrl);
                                       return restaurantBaseUrl;
                                      });

//reDirectSubUrl  login/booking
 var reDirectSubUrl = availibelTablesList.then(function(results){
                                        var reDirectSubUrl = results[1][0].trim().replace(/['"]+/g, '');
                                        //console.log("reDirectSubUrl ",reDirectSubUrl);
                                        return reDirectSubUrl;
                                      });

//sessionCookie  node_session_cookie=s%3Atbf6nrG6JNsmQsvoSWlx7ng5e3dO0NlO.JcTGCc6ujWdKIFgNFrGeKTiXcMqIeMykFrolN9O9rE0; Path=/; HttpOnly
var sessionCookie = availibelTablesList.then(function(results){
                                        var sessionCookie = results[1][1].trim().replace(/['"]+/g, '');
                                        //console.log("sessionCookie ",sessionCookie);
                                        return sessionCookie;
                                      });

//groupDetailForTabelBooking [ 'group1','fre1416','group1','fre1618','group1','fre1820','group1',
//'lor1820','group1','lor2022','group1','son1416','group1','son1618',
//'group1','son1820','group1','son2022','csrf_token','Jishgeny6753ydiayYHSjay0918','' ]
var groupDetailForTabelBooking = availibelTablesList.then(function(results){
                                      var groupDetailForTabelBooking= results[2];
                                      //console.log("groupDetailForTabelBooking", groupDetailForTabelBooking);
                                      return groupDetailForTabelBooking;
                                      });
//groupID group1
var groupID =   availibelTablesList.then(function(results){
                                      var groupID = results[2][0];
                                      //console.log("groupID", groupID);
                                      return groupID;
                                      });

//availibleTableFriday [ 'fre1416', 'fre1618', 'fre1820' ]
var availibleTableFriday = availibelTablesList.then(function(results){
                                      var availibleTableFriday = results[2].filter(function(a){
                                              if(a.match(/fre/))
                                                return true;
                                              else
                                                return false;
                                              });
                                              //console.log("availibleTableFriday", availibleTableFriday);
                                              return availibleTableFriday;
                                      });

//availibleTableSaturday [ 'lor1820', 'lor2022' ]
var availibleTableSaturday = availibelTablesList.then(function(results){
                                          var availibleTableSaturday = results[2].filter(function(a){
                                              if(a.match(/lor/))
                                                return true;
                                              else
                                                return false;
                                              });
                                              //console.log("availibleTableSaturday", availibleTableSaturday);
                                              return availibleTableSaturday;
                                       });

//availibleTableSunday [ 'son1416', 'son1618', 'son1820', 'son2022' ]
var availibleTableSunday = availibelTablesList.then(function(results){
                                          var availibleTableSunday = results[2].filter(function(a){
                                              if(a.match(/son/))
                                                 return true;
                                              else
                                                return false;
                                              });
                                              //console.log("availibleTableSunday", availibleTableSunday);
                                              return availibleTableSunday;
                                       });

//csrfString Jishgeny6753ydiayYHSjay0918
var csrfString = availibelTablesList.then(function(results){
                                          var csrfString = results[2][results[2].length -2];
                                        //  console.log("#######");
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
                                  //  console.log("cookie", cookie);
                                    var groupID = results[3];
                                    //console.log("groupID ",groupID);
                                    var dayTimeStringBooking = results[4];
                                    //console.log("dayTimeStringBooking ", dayTimeStringBooking);
                                    var csrfString = results[5];
                                    //console.log("csrfString", csrfString);
                            return BookATableAfterServerHasReceivedUserInput(fullbookingsUrl,cookie,groupID,dayTimeStringBooking,csrfString);
                          }).then(function(data){
                              console.log(data);
                              return data;
                          });

function formattingAvailibleTablesString(arr)
{
    var str = "";
  //  console.log("arr", arr);
    for (var i = 0; i < arr.length; i++ ){
      str += arr[i] + "   ";

    }
    str += "\n\n";
    str += "Book a table at Zeke's by typing on of the above time strings! \n";
    return str;
}

function movieStatusString(dayStr, obj){
  var str = "";
      //console.log("obj", obj);
      switch(dayStr){
        case "01":
           for (var i = 0; i < obj.length; i++){
               //console.log("obj.status", obj[i].status);
             if(obj[i].status )
                str += obj[i].time + "\n";
           }
           break;
        case "02":
          for (var i = 0; i < obj.length; i++){
            if(obj[i].status)
               str += obj[i].time + "\n";
          }
          break;
       case "03":
         for (var i = 0; i < obj.length; i++){
           if(obj[i].status )
              str += obj[i].time + "\n";
         }
         break;
      }
      return str;
}

  var presentationString =  Promise.all([meetingDay,onGoingMovies,cinemaDataMovie1,
         cinemaDataMovie2,cinemaDataMovie3,availibleTableFriday, availibleTableSaturday,availibleTableSunday])
                   .then(function(results){
                     var str = "";
                     var dayNumber;
                     switch(results[0]){
                       case "01":
                          str = "Meeting day when everybody can go out is friday!  \n";
                          dayNumber = 0;
                        break;
                       case "02":
                          str = "Meeting day when everybody can go out is saturday  \n";
                          dayNumber = 1;
                      break;
                      case "03":
                         str = "Meeting day when everybody can go out is sunday  \n";
                         dayNumber = 2;
                         break;
                     }
                     //console.log("Meeting String", str);
                     for (var i = 0; i < 3; i++){
                       str += "\n";
                       var dayStr = results[0];
                       var movieSchedule = results[2 + i];
                       var movieTitle = results[1][i];
                       var movieTimeStr = movieStatusString(dayStr, movieSchedule);
                       str += "Movie: " +  movieTitle +
                       " shows at:\n" +  movieTimeStr;
                     }
                     var tablesAtZekesThatDay = results[5 + dayNumber ];
                     var formattedTableBookingString = formattingAvailibleTablesString(tablesAtZekesThatDay);
                     str += "\n" + "Availble tables at Zekes bar that day are:"  + "\n\n" + formattedTableBookingString;
                      console.log( str);
                      //console.log(results[5]);
                      return str;
                   });


var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.engine("handlebars", exphbs({defaultLayout:"main"}));

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

presentationString.then(function(presentation){
  app.get("/hello", function(req, res){
         res.render("hello", {message: presentation});
        //  res.render("hello", {data:presentation});
  });
});
// app.get("/hello", function(req, res){
//    var presentation = Promise.resolve(presentationString);
//        res.render("hello", {data:"abc123"});
//       //  res.render("hello", {data:presentation});
// });

app.post("/say", function(req, res){

  var dayTimeStringBooking = req.body.say;

         var booking = Promise.all([restaurantBaseUrl, reDirectSubUrl,sessionCookie,
                                  groupID, dayTimeStringBooking,csrfString ])
                              .then(function(results){
                                      var fullbookingsUrl = results[0] + "/" + results[1];
                                      //console.log("fullbookingsUrl ", fullbookingsUrl);
                                      var cookie = results[2];
                                    //  console.log("cookie", cookie);
                                      var groupID = results[3];
                                      //console.log("groupID ",groupID);
                                      var dayTimeStringBooking = results[4];
                                      //console.log("dayTimeStringBooking ", dayTimeStringBooking);
                                      var csrfString = results[5];
                                      //console.log("csrfString", csrfString);
                              return BookATableAfterServerHasReceivedUserInput(fullbookingsUrl,cookie,groupID,dayTimeStringBooking,csrfString);
                            }).then(function(data){
                                console.log(data);
                                return data;
                            });
      booking.then(function(message){
        res.render("say", {data:message});
      });
});

var port = 8080;
app.listen(port, function(){
    console.log("server listening on port ", port)
});
