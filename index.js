const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
const { User } = require("./routes/models/user");
const { Image } = require("./routes/models/image");
const { Tag } = require("./routes/models/tag");
const keys = require("./keys");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");

const multiparty = require("connect-multiparty");
multipartyMiddleware = multiparty();

app.use(multipartyMiddleware);

mongoose.connect(
  "mongodb://user1:user123@ds119652.mlab.com:19652/login",
  { userNewUrlParser: true }
);

//mongoose.connect(
//"mongodb://user1:pass@13.210.197.54:27017/PhotoTagging",
//{ userNewUrlParser: true }
//);
require('./routes/main')(app);

if (process.env.NODE_ENV == "production") {
  //Express will server up production assets
  // like main.js or main.css
  app.use(express.static("client/build"));
  //Express will serve up index.html if doesnt recongize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);
