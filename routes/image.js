const { Image } = require("./models/image");
const _ = require("lodash");

module.exports = app => {
	app.post("/image/add", (req, res) => {
	  var body = _.pick(req.body, [
	    "qid",
	    "eventNumber",
	    "dateTime",
	    "location",
	    "tags",
	    "offence",
	    "iu"
	  ]);
	  var image = new Image(body);
	  console.log("posting");
	  console.log(body);
	  image.save().catch(e => {
	    res.status(400).send();
	  });
	});
};
