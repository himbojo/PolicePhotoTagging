const express = require("express");
const axios = require("axios");
const mysql = require("mysql");
const fs = require("fs");
const app = express();
const _ = require("lodash");
const {User} = require("./routes/models/user");

const keys = require("./keys");


const mongoose = require("mongoose");

mongoose.connect("mongodb://user1:user123@ds119652.mlab.com:19652/login", {
  userNewUrlParser: true
});

//require("./routes/login.js")(app);

app.post("/users/reg", (req, res) => { // REG USER
  console.log("users/reg");
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send();
    });

  });

var connection = mysql.createConnection({
  host: keys.DB_HOST_NAME,
  user: keys.DB_ADMIN_USER,
  password: keys.DB_ADMIN_PASS,
  ssl: {
    ca: fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem")
  }
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

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id" + connection.threadId);
});

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
