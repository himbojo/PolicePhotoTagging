const { Tag } = require("./models/tag");
const _ = require("lodash");
module.exports = app => {
  app.post("/image/search", (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags;
    var imageNameArray = [];
    // for(var i = 0; i < tags.length; i++){
    //   var strings = tags[i].text.split(" ");
    //   var item = strings[0];
    //   var colour = strings[1];
    // }
    _.forEach(tags, function(value) {
        console.log(value);
        _.forEach(value.text, function(value1) {
          console.log(value1)
          // value1.text.split(" ");
          // var item = strings[0];
          // var colour = strings[1];
          // console.log(item + " " + colour);
        });
    });
    console.log(item + " " + colour);
    // var imageName = _.map(imageName, function(num){
    //   return Tag.find({ "type": item, "colour.name": colour }).fetch();
    // console.log(imageName);});







    // Tag.findOne({ "type": item }, function(err, doc) {
    //   var colourObject = doc.colour;
    //
    //   // for (var j = 0; j < colourObject.length; j++) {
    //   //   if(colourObject[j].name === colour){
    //   //     imageNameArray = colourObject[j].imageName;
    //   //     break;
    //   //   }
    //   // }
    //   console.log(imageNameArray);
    //
    // });

  //console.log(imageName);
});
};
