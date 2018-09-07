const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
const { User } = require("./routes/models/user");
const { Image } = require("./routes/models/image");

const keys = require("./keys");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const mongoose = require("mongoose");
const fs = require('fs');
const S3FS = require('s3fs');
const s3fsImpl = new S3FS('policephototaggingstorage', {
  accessKeyId: 'AKIAIPC5WDUR6SXASWTQ',
  secretAccessKey: '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'
});
const multiparty = require('connect-multiparty');
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

//require("./routes/login.js")(app);

app.post("/users/reg", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  console.log(body);
  user
    .save()
    .then(() => {
      console.log("generate");
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send();
    });
    res.redi
});

app.post("/image/add", (req, res) => {
  var body = _.pick(req.body, ["qid", "eventNumber", "dateTime", "location", "tags", "offense", "iu"]);
  var image = new Image(body);
    console.log("posting");
  console.log(body);
  image
    .save()
    .catch(e => {
      res.status(400).send();
    });
});

app.post("/bucket/add", (req, res) => {
  console.log("start");
  console.log(req.body);


  console.log("done");
//  var stream = fs.createReadStream(req.body.file);
  /*return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
    fs.unlink(file.path, function(err){
      if(err){
        console.error(err);
      }
    })
  }); */
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

/*axios.get('http://hotsapi.net/api/v1/heroes')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  }); */
const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);
