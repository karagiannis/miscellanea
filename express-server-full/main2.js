var extractTheMeetingDays = require("./appEx2").extractTheMeetingDays;
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

cinemaData1 = meetingDay.then(function(dayStr){
                   return extractMovieShowData(dayStr,"01");
              }).then(function(data){
                  console.log("film1data ", data);
                  return data;
              });
