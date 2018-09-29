const fs = require("fs");
const S3FS = require("s3fs");
const s3 = require('s3');
const AWS = require('aws-sdk');
//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
  secretAccessKey: "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"
});

var client = new AWS.S3();

// const s3fsImpl = new S3FS("policephototaggingstorage/photos", {
//   accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
//   secretAccessKey: "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"
// });

module.exports = app => {
  app.post("/bucket/get", async (req, res) => {
    //get array of imagenames from req.body

    //var fsImplStyles = s3fsImp1.getPath(file.name);
    var imageNameArray = req.body;
    var imageByteArrays = [];

    for (var i = 0; i < imageNameArray.length; i++) {
      //s3fsImpl.getpath();
      var stream = await s3fsImpl.readFile(imageNameArray[i], "binary");
      //  console.log(stream);
      var base64data = new Buffer(stream.Body, "binary").toString("base64");
      //  console.log(base64data);
      imageByteArrays.push(base64data);
    }

    res.send(imageByteArrays);
  });

  app.post("/bucket/add", (req, res) => {
    console.log("/bucket/add");
    var files = req.files;
    var name = req.body.name;
    var file = files[name];

    name = name.split("$").join(".");
    file.fieldName = name;
    file.originalFilename = name;
    file.name = name;
    file.headers = "";
    //var stream = fs.createReadStream(file.path);
    var params = {
      Bucket: 'policephototaggingstorage/photos',
      Body : fs.createReadStream(file.path),
      Key : file.name
    };
    client.upload(params, function (err, data) {
      //handle error
      if (err) {
        console.log("Error", err);
      }

      //success
      if (data) {
        console.log("Uploaded in:", data.Location);
      }
    });
    // return s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    //   fs.unlink(file.path, function(err) {
    //     if (err) {
    //       console.error(err);
    //     }
    //   });
    // });
  });
};
