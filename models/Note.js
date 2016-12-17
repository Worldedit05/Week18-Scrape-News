// Require Mongoose and create a schema class
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// Create the Comment model
var Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;
