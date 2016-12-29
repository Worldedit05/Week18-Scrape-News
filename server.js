var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var request    = require('request');
var rp         = require('request-promise');
var cheerio    = require('cheerio');
// Mongoose Models
var Picture    = require('./models/Picture.js');
var Note       = require('./models/Note.js');

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

// Setup database with mongoose
mongoose.connect("mongodb://heroku_d9pxq0zp:qbqvn5dfbocdprho6g8glu3je3@ds033066.mlab.com:33066/heroku_d9pxq0zp");

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

  rp("https://www.reddit.com/r/spaceporn/", function(error, response, html) {
    var $ = cheerio.load(html);

    $(".thing").each(function(i, element) {

      var result = {};

      result.title = $(this).attr("data-fullname");
      result.name = $(this).find("a.title").text();
      result.img = $(this).children("a").attr("href");

      console.log(result.name);

      var query = { title: result.title };
      var update = { $inc: { pullCount: 1 }, name: result.name, img: result.img };
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
  }).then(function(data) {
    res.send("New Pictures Gathered!");
  });
});

app.get("/pictures", function (req, res) {

  Picture.find({}, function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});

app.get("/pictures/:id", function(req, res) {

  Picture.findOne({ "_id": req.params.id })
  .populate("note")
  .exec(function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});

app.post("/pictures/:id", function(req, res) {

  console.log(req.body);

  var newNote = new Note(req.body);

  newNote.save(function(error, doc) {

    if (error) {
      console.log(error);
    }
    else {

      Picture.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id }, { upsert: true, new: true })
      .exec(function (error, doc) {
        if (error) {
          console.log(error);
        }
        else {
          res.send(doc);
        }
      });
    }
  });
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("App is listening on " + PORT);
});
