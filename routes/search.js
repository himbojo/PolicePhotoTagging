const { Tag } = require("./models/tag");
const _ = require("lodash");
module.exports = app => {
  app.post("/image/search", async (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags;
    var imageNameArray = [];
  //  console.log(tags[0].text + "\n" + tags[1].text + "finish")
    for(var i = 0; i < tags.length; i++){
      var strings = tags[i].text.split(" ");
      var item = strings[0];

      var colour = strings[1];
    //  console.log(colour + "is colour");
    // }
    // _.forEach(tags, function(value) {
    //     console.log(value);
    //     _.forEach(value.text, function(value1) {
    //       console.log(value1)$
    //       // value1.text.split(" ");
    //       // var item = strings[0];
    //       // var colour = strings[1];
    //       // console.log(item + " " + colour);
    //     });
    // });
  //  console.log(item + " " + colour);
    // var imageName = _.map(imageName, function(num){
    //   return Tag.find({ "type": item, "colour.name": colour }).fetch();
    // console.log(imageName);});







    await Tag.findOne({ "type": item }, function(err, doc) {
      var colourObject = doc.colour;
      //console.log(colour + " is colour we search for");
      for (var j = 0; j < colourObject.length; j++) {

        if(colourObject[j].name === colour){
        //  console.log("break");
        //  console.log(colourObject[j].imageName);
          imageNameArray = imageNameArray.concat(colourObject[j].imageName);
        //  console.log(imageNameArray + " is aray");
          break;
        }
      }



    });
  }
//  console.log(imageNameArray + "is final");
  //console.log(imageName);
//  console.log(imageNameArray);

  // gets rid of duplicate values with _.uniq
  res.send(_.uniq(imageNameArray));
});
};
