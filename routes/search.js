const { Tag } = require("./models/tag");
var pool = require('./database');
const _ = require("lodash");

module.exports = app => {
  app.post("/image/search", async (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags;
    var imageNameArray = [];
    var imageInfoArray = [];
  //  console.log(tags[0].text + "\n" + tags[1].text + "finish")
    for(var i = 0; i < tags.length; i++){
      var strings = tags[i].text.split(" ");
      var item = strings[0];
      var colour = strings[1];
      var imageIdArray = [];

      var selectColour = await pool.query('SELECT ID FROM Colours WHERE colour = ?', [colour]);
      //if the array is empty insert and return insertId, else make select colour equal to the colour we selected
      if(!selectColour.length){
        selectColour = null;
        console.log("no colour");
      }else{
        selectColour = selectColour[0].ID;
      }
      console.log("Colour ID: " + selectColour);

      //query to select item
      var selectItem = await pool.query('SELECT ID FROM Items WHERE item = ?', [item]);
      //if the array is empty insert and return insertId, else make select colour equal to the colour we selected
      if(!selectItem.length){
        selectItem = null;
        console.log("no item");
      }else{
        selectItem = selectItem[0].ID;
      }
      console.log("Item ID: " + selectItem);

      //link id's
      var selectLink = await pool.query('SELECT imageID FROM Link WHERE itemID = ? AND colourID = ?', [selectItem, selectColour]);
      for (var j = 0; j < selectLink.length; j++) {
        imageIdArray = imageIdArray.concat(selectLink[j].imageID);
      }

      console.log(imageIdArray);

      var selectImage = await pool.query('SELECT * FROM Images WHERE ID IN (?)', [imageIdArray]);

      for (j = 0; j < selectImage.length; j++) {
        imageInfoArray = imageInfoArray.concat(selectImage[j]);
        imageNameArray = imageNameArray.concat(selectImage[j].image_name);
      }


      console.log(imageNameArray);


    // await Tag.findOne({ "type": item }, function(err, doc) {
    //   var colourObject = doc.colour;
    //   //console.log(colour + " is colour we search for");
    //   for (var j = 0; j < colourObject.length; j++) {
    //
    //     if(colourObject[j].name === colour){
    //     //  console.log("break");
    //     //  console.log(colourObject[j].imageName);
    //       imageNameArray = imageNameArray.concat(colourObject[j].imageName);
    //     //  console.log(imageNameArray + " is aray");
    //       break;
    //     }
    //   }
    //
    //
    //
    // });
  }
//  console.log(imageNameArray + "is final");
  //console.log(imageName);
//  console.log(imageNameArray);

  // gets rid of duplicate values with _.uniq
  res.send(_.uniq(imageNameArray));
});
};
