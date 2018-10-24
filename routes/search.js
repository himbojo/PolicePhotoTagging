var pool = require("./database");
const _ = require("lodash");
const fs = require("fs");
const s3 = require('s3');
const client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
    secretAccessKey: "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",
  },
});

// const client = s3.createClient({
//   maxAsyncS3: 20,     // this is the default
//   s3RetryCount: 3,    // this is the default
//   s3RetryDelay: 1000, // this is the default
//   multipartUploadThreshold: 20971520, // this is the default (20 MB)
//   multipartUploadSize: 15728640, // this is the default (15 MB)
//   s3Options: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_ACCESS_KEY
//   },
// });


const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBQHmyt52mE15WOMQX9_dLeQ2LGQN1PFNA', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

//Searchs the database with the given query and then return the results
//ONLY SEARCHS BY TAGS ATM
module.exports = app => {
  app.post("/image/search", async (req, res) => {
    var tags = req.body.tags;
    var qid = req.body.qid;
    var filenumber = req.body.filenumber;
    var offence = req.body.offence;

    var imageNameArray = [];
    var imageInfoArray = [];
    //for all of the tags in the searched query
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
      } else {
        selectColour = selectColour[0].ID;
      }

      //SELECT i.ID,c.ID from Items i, Colours c where Item in (?) and colour in (?);
      //query to select item
      var selectItem = await pool.query("SELECT ID FROM Items WHERE item = ?", [
        item
      ]);
      //if the array is empty insert and return insertId, else make select colour equal to the colour we selected
      if (!selectItem.length) {
        selectItem = null;
      } else {
        selectItem = selectItem[0].ID;
      }
      var selectLink = await pool.query(
        "SELECT imageID FROM Link WHERE itemID = ? AND colourID = ?",
        [selectItem, selectColour]
      );
      //add all of the found images to the id results
      for (var j = 0; j < selectLink.length; j++) {
        imageIdArray = imageIdArray.concat(selectLink[j].imageID);
      }
      var selectImage = await pool.query(
        'SELECT * FROM Images WHERE ID IN (SELECT imageID FROM Link WHERE itemID = ? AND colourID = ?)', [selectItem, selectColour]
      );

      var tempArray = [];
      //if a qid has been entered, refine the query by it
      if(qid!=""){
        var qidNum = parseInt(qid, 10);
        for (j = 0; j < selectImage.length; j++) {
          tempArray = tempArray.concat(selectImage[j].ID);
        }
        selectImage = await pool.query(
           "SELECT * FROM Images WHERE ID IN (?) AND qid = ?", [tempArray, qidNum]
        );
      }
      //if a event number has been enter, refine the query by it
      if(filenumber!=""){
        tempArray = [];
        fileNum = parseInt(filenumber, 10);
        for (j = 0; j < selectImage.length; j++) {
          tempArray = tempArray.concat(selectImage[j].ID);
        }
        selectImage = await pool.query(
           "SELECT * FROM Images WHERE ID IN (?) AND event_number = ?", [tempArray, fileNum]
        );
      }
      //if a offence has been entered, refine the search by it
      if(offence!=""){
        tempArray = [];
        for (j = 0; j < selectImage.length; j++) {
          tempArray = tempArray.concat(selectImage[j].ID);
        }
        selectImage = await pool.query(
           "SELECT * FROM Images WHERE ID IN (?) AND offence = ?", [tempArray, offence]
        );
      }

      for (j = 0; j < selectImage.length; j++) {
        imageInfoArray = imageInfoArray.concat(selectImage[j]);
      }
      //get all of the tags for the image(s) that have been found
      for (var k = 0; k < imageInfoArray.length; k++) {
        //name of image
        var key = imageInfoArray[k].image_name;
        //imageInfoArray[k].blob = base64data;
        //ap-southeast-2
        var image_tags = await pool.query(
          'SELECT Items.item, Colours.colour FROM ((Link INNER JOIN Items ON Items.ID = Link.itemID) INNER JOIN Colours ON Colours.ID = Link.colourID) WHERE imageID = ?', [imageInfoArray[k].ID]
        );
        var tagArray = [];
        for (var l = 0; l < image_tags.length; l++) {
          var mergeTag = {
            id: image_tags[l].item + " " + image_tags[l].colour,
            text: image_tags[l].item + " " + image_tags[l].colour
          }
          tagArray = tagArray.concat(mergeTag);
        }

        var locData = await geocoder.reverse({lat:imageInfoArray[k].location.x, lon:imageInfoArray[k].location.y});
        imageInfoArray[k].locationName = locData[0].formattedAddress;
        imageInfoArray[k].image_tags = tagArray;
        imageInfoArray[k].path = await s3.getPublicUrl('policephototaggingstorage/photos', key, ['ap-southeast-2']);
      }
    }


    res.send(_.uniq(imageInfoArray));
  });
};
