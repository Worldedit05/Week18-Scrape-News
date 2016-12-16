// Require Mongoose and create a schema class
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserCommentSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// Create the Comment model
var UserComment = mongoose.model("UserComment", UserCommentSchema);

// Export the model
module.exports = UserComment;
