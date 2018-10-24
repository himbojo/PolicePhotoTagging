const _ = require("lodash");
const { User } = require("./models/user");
//Add the registered user to the database
module.exports = app => {
	app.post("/users/reg", (req, res) => {
	  var body = _.pick(req.body, ["email", "password"]);
	  var user = new User(body);
	  user
	    .save()
	    .then(() => {
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
