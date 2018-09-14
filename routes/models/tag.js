const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var ColourSchema = new mongoose.Schema({
  Colour: {
    name: String,
    $addToSet: { imageName: { $each: { [] } } }
  }
});

var ItemSchema = new mongoose.Schema({
  Item: {
    name: String,
    $addToSet: { Colour: { $each: { [ColourSchema] } } }
  }
});

var TagSchema = new mongoose.Schema({
  tag: {
    $addToSet: { items: { $each: { [ItemSchema] } } }
  }
});

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
