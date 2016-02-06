var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.engine("handlebars", exphbs({defaultLayout:"main"}));

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

var prepareForUserInput = require("./appEx").prepareForUserInput;
app.get("/hello", function(req, res){
        res.render("hello", prepareForUserInput);
});

app.post("/say", function(req, res){
        res.render("say", {data:req.body.say});
});

var port = 8080;
app.listen(port, function(){
    console.log("server listening on port ", port)
});
