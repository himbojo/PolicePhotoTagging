const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
const { Upload } = require("./models/upload");
app.use(bodyParser.json());
const mongoose = require("mongoose");

app.post("/photos/upload", (req, res) => {
  var body = _.pick(req.body, ["qid", "eventNumber", "date", "time", "location", "tags", "offense", "iu"]);
  var upload = new Upload(body);
  console.log(body);
  upload
    res.save()
    .catch(e => {
      res.status(400).send();
    });
});
