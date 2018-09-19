const { Tag } = require("./models/tag");

module.exports = app => {
  app.post("/image/search", (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags;
    var imageNameArray = [];
    for(var i = 0; i < tags.length; i++){
    var strings = tags[i].text.split(" ");
    var item = strings[0];
    var colour = strings[1];
    console.log(item + " " + colour);
    Tag.findOne({ "type": item }, function(err, doc) {
      var colourObject = doc.colour;
      for (var j = 0; j < colourObject.length; j++) {
        if(colourObject[j].name === colour){
          imageNameArray = colourObject[j].imageName;
          break;
        }
      }
      console.log(imageNameArray);

    });
  }
  console.log(imageNameArray);
});
};
