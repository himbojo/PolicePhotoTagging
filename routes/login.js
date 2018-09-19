const _ = require("lodash");
const { User } = require("./models/user");

module.exports = app => {
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
};
