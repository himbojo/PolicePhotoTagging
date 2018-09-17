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
app.use(bodyParser.urlencoded({extended: true}));
const mongoose = require("mongoose");
const fs = require('fs');
const S3FS = require('s3fs');
const s3fsImpl = new S3FS('policephototaggingstorage/photos', {
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
app.post("/users/login", (req, res) => {
  console.log("HERERERE");
  var body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
  .then(user => {
    console.log("now here");
    return user.generateAuthToken().then(token => {
      res.header("xauth", token).send(user);
    });
  })
  .catch(e => {
    res.status(400).send();
  });
});
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
    res.header("xauth", token).send(user);
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
  image.save().catch(e => {
    res.status(400).send();
  });
});

app.post("/bucket/add", (req, res) => {
  console.log("start");
  var files = req.files;
  var name = req.body.name;
  var file = files[name];
  console.log(file);
  console.log("done");
  console.log(file.path);
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
    fs.unlink(file.path, function(err){
      if(err){
        console.error(err);
      }
    })
  });
});



app.get("/image/search", (req, res) =>{
  console.log("You got here");
  var tags = getTags();
  console.log(tags);
  res.render('images', {})
});

function getTags(){
  //  var body = _.pick(req.body, ["qid", "eventNumber", "dateTime", "location", "tags", "offense", "iu"]);
  //var image = new Image();
  mongoose.get({"qid": "6969"}, function(err, objs){
    var gettingtags;
    if (objs.length ==1)
    {
      gettingtags = objs[0].qid;
      console.log(gettingtags);
      return gettingtags;
    }
  });
}

app.post("/tag/update", (req, res) => {
  console.log("/tag/update");
  var tags = req.body.tags;
  var image = req.body.iu;
  console.log(tags);
  for (var i = 0; i < tags.length; i++) {
    var tag1 = tags[i].text.split(" ");
    var item = tag1[0];
    var colour = tag1[1];
    Tag.findOneAndUpdate(
      { "type": item, "colour.name": colour},
      {
        "$addToSet": {
          "colour.$.imageName": image
        }
      },
      function(err,doc) {

      }
    );
  }



  // var body = _.pick(req.body, ["qid", "eventNumber", "dateTime", "location", "tags", "offense", "iu"]);
  // var tag = new Tag({
  //   type: "other",
  //   colour: [
  //     {
  //       name: "blue",
  //       imageName: ["2018-09-13_03:46:15_lauryn$png"]
  //     }]
  // });
  //
  // tag.save().catch(e => {
  //   res.status(400).send();
  // });

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
