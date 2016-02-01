

var url = process.argv[2] || "http://46.101.232.43 ";

var scraper = require("./lib/utility").scraper;

//scraper(url);
var loader = require("./lib/utility").promiseHtml;
var linkExtractor = require("./lib/utility").linkExtractor;
var arrayOfLinksMainPage = [];
var p1 = [];
this.arrayofLinksToCalendars = [];
this.namesOfFriends = [];
this.calendarBaseUrl = "";
this.cinemaUrl = "";
this.restaurantUrl = "";

    p1 = loader(url)
                    .then(function(html){  //Get the main html page from input url
                        //console.log(html);
                        return linkExtractor(html);   //Extract all links
                    })
                    .then(function(links){
                      //console.log(links);
                      this.arrayOfLinksMainPage = links;
                      //console.log(this.arrayOfLinksMainPage);
                      return(links);          // Send them along untouched
                    })
                    .then(function(arrayOfLinksMainPage){      //H
                      this.calendarBaseUrl = url.trim().concat(arrayOfLinksMainPage[0]);
                      this.cinemaUrl = url.trim().concat(arrayOfLinksMainPage[1]);
                      this.restaurantUrl = url.trim().concat(arrayOfLinksMainPage[2]);

                      console.log(url.trim().concat(arrayOfLinksMainPage[0])); //Print out the url + the substring which is the link to the calendar page
                      return loader(url.trim().concat(arrayOfLinksMainPage[0]));  //load the calendar page
                    })
                    .then(function(html){
                      //console.log(html);      //Print out the calendar page
                      return linkExtractor(html);
                    })
                    .then(function(arrayofLinksToCalendars){    //Extract the links to each calendar of each friend
                      console.log("arrayofLinksToCalendars ", arrayofLinksToCalendars);
                      this.arrayofLinksToCalendars = arrayofLinksToCalendars;  //Store the links to each calendar
                      console.log(url.trim().concat("/").concat( arrayofLinksToCalendars[0]));
                      return (load(url.trim().concat("/").concat( arrayofLinksToCalendars[0])));
                    })
                    .then(function(petersCalendarHtmlPage){
                      console.log(petersCalendarHtmlPage);
                      console.log("this.arrayOfLinksMainPage", this.arrayOfLinksMainPage);
                      console.log("this.calendarBaseUrl", this.calendarBaseUrl);
                      console.log("this.cinemaUrl", this.cinemaUrl);
                      console.log("this.arrayofLinksToCalendars", this.arrayofLinksToCalendars);
                    });


// Promise.all(p1).then(function(arr){
//                                   console.log(arr[0]);
//                                   return linkExtractor(url.concat(arr[0]));
//                               });
