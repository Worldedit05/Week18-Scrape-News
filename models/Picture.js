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
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  pullCount: {
    type: Number,
    default: 0
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create the Picture model with the PictureSchema above

var Picture = mongoose.model("Picture", PictureSchema);

// Export
module.exports = Picture;
