// Require Mongoose and create a schema class
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// Create the Comment model
var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
