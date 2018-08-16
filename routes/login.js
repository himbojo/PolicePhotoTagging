/*const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var app = express();
module.exports = app => {

  });

  app.post("/users/login", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header("x-auth", token).send(user);
        });
      })
      .catch(e => {
        res.status(400).send();
      });
  });
};
*/
