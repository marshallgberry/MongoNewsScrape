//dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up port
var PORT = process.env.PORT || 3000;

//instantiate express app
var app = express();

//express router
var router = express.Router();

//require routes file pass router obect
require("./config/routes")(router);

//designate public folder as a static dir
app.use(express.static(__dirname + "/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyparser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

//every request goes through router middleware
app.use(router);

//unless deployed, use the local mongoHeadlines db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to database
mongoose.connect(db, function(err) {
    //log errors connecting with mongoose
    if (err) {
        console.log(err);
    }
    //or log success message
    else {
        console.log("mongoose connection is successful");
    }
});

//listen on the port
app.listen(PORT, function() {
    console.log("Listening on port" + PORT);
});