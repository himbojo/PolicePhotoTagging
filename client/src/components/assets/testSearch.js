const { Tag } = require("./models/tag");

module.exports = app => {
  app.post("/image/search", (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags;
    var imageNameArray = [];
    var obj;
    for(var i = 0; i < tags.length; i++){
    var strings = tags[i].text.split(" ");
    var item = strings[0];
    var colour = strings[1];
  //  console.log(item + " " + colour);
    obj = Tag.findOne({ "type": item }, function(err, doc) {
      var colourObject = doc.colour;
      //return colourObject;

    });
    // console.log(obj);
    for (var j = 0; j < obj.length; j++) {
      console.log("funky");
      if(obj[j].name === colour){
        console.log(colour);
        imageNameArray = obj[j].imageName;
        break;
      }
    }
    //console.log(imageNameArray);
  }
  // console.log(imageNameArray);
});
};
