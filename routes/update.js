const { Tag } = require("./models/tag");

module.exports = app => {
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
	      { type: item, "colour.name": colour },
	      {
	        $addToSet: {
	          "colour.$.imageName": image
	        }
	      },
	      function(err, doc) {}
	    );
	  }
	});
};
