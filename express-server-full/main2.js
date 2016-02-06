var extractTheMeetingDays = require("./appEx2").extractTheMeetingDays;
var extractMovieNames = require("./appEx2").extractMovieNames;
var extractMovieShowData = require("./appEx2").extractMovieShowData;
var prepareForUserInput = require("./appEx2").prepareForUserInput;
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
                        console.log("meetingday ", str);
                        return str;
                  });

var onGoingMovies = meetingDay.then(function(dayStr){
                        return extractMovieNames(dayStr);
                  }).then(function(data){
                      console.log(data);
                      return data;
                  });

cinemaDataMovie1 = meetingDay.then(function(dayStr){
                   return extractMovieShowData(dayStr,"01");
              }).then(function(data){
                  console.log("film1data1 ", data);
                  return data;
              });

cinemaDataMovie2 = Promise.all([meetingDay, cinemaDataMovie1]).then(function(results){
                   var dayStr = results[0];
                   return extractMovieShowData(dayStr,"02");
              }).then(function(data){
                  console.log("film1data2 ", data);
                  return data;
              });

cinemaDataMovie3 = Promise.all([meetingDay,cinemaDataMovie1, cinemaDataMovie2 ]).then(function(results){
                   var dayStr = results[0];
                   return extractMovieShowData(dayStr,"03");
              }).then(function(data){
                  console.log("film1data3 ", data);
                  return data;
              });
