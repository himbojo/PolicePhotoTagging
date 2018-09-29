const { Tag } = require("./models/tag");
var pool = require("./database");
const _ = require("lodash");
const fs = require("fs");
const S3FS = require("s3fs");
const s3fsImpl = new S3FS("policephototaggingstorage/photos", {
  accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
  secretAccessKey: "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"
});

module.exports = app => {
  app.post("/image/search", async (req, res) => {
    console.log("/image/search");
    var tags = req.body.tags;

    var imageNameArray = [];
    var imageInfoArray = [];
    //  console.log(tags[0].text + "\n" + tags[1].text + "finish")
    for (var i = 0; i < tags.length; i++) {
      var strings = tags[i].text.split(" ");
      var item = strings[0];
      var colour = strings[1];
      var imageIdArray = [];

      var selectColour = await pool.query(
        "SELECT ID FROM Colours WHERE colour = ?",
        [colour]
      );
      //if the array is empty insert and return insertId, else make select colour equal to the colour we selected
      if (!selectColour.length) {
        selectColour = null;
        console.log("no colour");
      } else {
        selectColour = selectColour[0].ID;
      }
      console.log("Colour ID: " + selectColour);

      //SELECT i.ID,c.ID from Items i, Colours c where Item in (?) and colour in (?);
      //query to select item
      var selectItem = await pool.query("SELECT ID FROM Items WHERE item = ?", [
        item
      ]);
      //if the array is empty insert and return insertId, else make select colour equal to the colour we selected
      if (!selectItem.length) {
        selectItem = null;
        console.log("no item");
      } else {
        selectItem = selectItem[0].ID;
      }
      console.log("Item ID: " + selectItem);
      var selectLink = await pool.query(
        "SELECT imageID FROM Link WHERE itemID = ? AND colourID = ?",
        [selectItem, selectColour]
      );
      for (var j = 0; j < selectLink.length; j++) {
        imageIdArray = imageIdArray.concat(selectLink[j].imageID);
      }
      var selectImage = await pool.query(
        'SELECT * FROM Images WHERE ID IN (SELECT imageID FROM Link WHERE itemID = ? AND colourID = ?)', [selectItem, selectColour]
      );

      for (j = 0; j < selectImage.length; j++) {
        imageInfoArray = imageInfoArray.concat(selectImage[j]);
        imageNameArray = imageNameArray.concat(selectImage[j].image_name);
      }

      console.log(imageInfoArray);
      console.log(imageNameArray);
      for (var k = 0; k < imageNameArray.length; k++) {
        var stream = await s3fsImpl.readFile(imageNameArray[k], "binary");
        var base64data = new Buffer(stream.Body, "binary").toString("base64");
        imageInfoArray[k].blob = base64data;
        //imageInfoArray[k].path = base64data;
      }
    }

    res.send(_.uniq(imageInfoArray));
  });
};
