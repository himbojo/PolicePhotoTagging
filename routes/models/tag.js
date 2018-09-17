const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var ColourSchema = new mongoose.Schema({
  name: String,
  imageName: []
});

var TagSchema = new mongoose.Schema({
  type: String,
  colour: [ColourSchema]
});

// var TagSchema = new mongoose.Schema({
//   clothingType: [TypeSchema]
// });

TagSchema.methods.toJSON = function() {
  var tag = this;
  var tagObject = tag.toObject();

  return _.pick(tagObject, ["tag"]);
};

TagSchema.pre("save", function(next) {
  var tag = this;
  next();
});

var Tag = mongoose.model("Tag", TagSchema);

module.exports = { Tag };
