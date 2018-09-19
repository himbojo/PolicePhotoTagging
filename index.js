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
// const fs = require("fs");
// const S3FS = require("s3fs");
// const s3fsImpl = new S3FS("policephototaggingstorage/photos", {
//   accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
//   secretAccessKey: "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"
// });
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

app.post("/image/search", (req, res) => {
  console.log("/image/search");

  var tags = req.body.tags[0];
  console.log(tags);
  // var tag1 = tags[i].text.split(" ");
  // var item = tag1[0];
  // var colour = tag1[1];
  var array = [];
  // for (var i = 0; i < tags.length; i++) {
  Tag.find({ type: tags.text }, function(err, doc) {
    for (var j = 0; j < doc.length; j++) {
      for (var i = 0; i < doc[j].colour.length; i++) {
        //if there are images in the array
        if (doc[j].colour[i].imageName.length > 0) {
          //for all images
          for (var k = 0; k < doc[j].colour[i].imageName.length; k++) {
            //console.log(doc[j].colour[i].imageName[k]);
            //finds all objects that have that image in it
            Image.find({ iu: doc[j].colour[i].imageName[k] }, (err, data) => {
              //  console.log(data);
              res.send(data);
            });
          }
        }
      }
    }
  }).catch(e => {});
  // }
});

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
