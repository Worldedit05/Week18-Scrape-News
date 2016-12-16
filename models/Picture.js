// Mongoose requirement and creating a Schema class
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create a picture schema for the imgs

var PictureSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Create the Picture model with the PictureSchema above

var Picture = mongoose.model("Picture", PictureSchema);

// Export
module.exports = Picture;
