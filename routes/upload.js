const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");

const keys = require("./keys");
app.use(bodyParser.json());
const mongoose = require("mongoose");

app.post("/photos", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  console.log(body);
  user
    .save()
    .catch(e => {
      res.status(400).send();
    });
});
