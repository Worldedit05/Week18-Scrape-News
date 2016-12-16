var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var request     = require('request');
var cheerio     = require('cheerio');
// Mongoose Models
var Picture     = require('./models/Picture.js');
var UserComment = require('./models/UserComment.js');

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

    $(".thing").each(function(i, element) {

      var result = {};

      result.title = $(this).attr("data-fullname");
      result.img = $(this).children("a").attr("href");

      console.log(result);

      var query = { title: result.title };
      var update = { $inc: { pullCount: 1 }, img: result.img };
      var options = { upsert: true, new: true };

      Picture.findOneAndUpdate(query, update, options, function (error, doc) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(doc);
        }
      });

    });
  });
  res.send("New Pictures Gathered!");
});

// TODO: Add a GET route to pull the scraped information from the database

app.listen(3000, function() {
  console.log("App is listening on port 3000");
});
