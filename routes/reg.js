const _ = require("lodash");
const { User } = require("./models/user");

module.exports = app => {
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
	  res.redi;
	});
};
