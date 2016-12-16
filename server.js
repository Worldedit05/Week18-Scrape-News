var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var request    = require('request');
var cheerio    = require('cheerio');

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

// Setup database with mongoose
mongoose.connect("mongodb://localhost/week18homework");

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes
app.get("/", function(req, res) {
  res.send(index.html);
});

app.get("/getdata", function (req, res) {

  request("https://www.reddit.com/r/spaceporn/", function(error, response, html) {
    var $ = cheerio.load(html);

    $("div a").each(function(i, element) {

      var result = {};

      result.img = $(this).children("img").attr("src");

      // TODO: take the results and added them to mongodb with mongoose
    });
  });
});

// TODO: Add a GET route to pull the scraped information from the database
