const { Tag } = require("./models/tag");

module.exports = app => {
  app.post("/image/search", (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags[0];
    console.log(tags);
    var strings = tags.text.split(" ");
    var item = strings[0];
    var colour = strings[1];
    console.log(item);
    console.log(colour);
    var array = [];
    Tag.find({ "type": item, "colour": {$elemMatch: {"name": colour}}}, function(err, doc) {
      console.log(doc);
    });
  });
};
