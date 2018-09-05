const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var ImageSchema = new mongoose.Schema({
  qid: {
    type: String,
    trim: true
  },
  eventNumber: {
    type: String,
    trim: true
  },
  dateTime: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  tags: {
    type: [],
    trim: true
  },
  offense: {
    type: String,
    trim: true
  },
  iu: {
    type: String,
    trim: true
  }
});

ImageSchema.methods.toJSON = function() {
  var image = this;
  var imageObject = image.toObject();

  return _.pick(imageObject, ["_id", "qid", "eventNumber", "dateTime", "location", "tags", "offense", "iu"]);
};

ImageSchema.pre("save", function(next) {
  var image = this;
  next();
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = { Image };
