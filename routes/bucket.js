const fs = require("fs");
const s3 = require('s3');
const AWS = require('aws-sdk');
//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
  secretAccessKey: "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"
});

var client = new AWS.S3();

module.exports = app => {
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

    var params = {
      Bucket: 'policephototaggingstorage/photos',
      Body : fs.createReadStream(file.path),
      Key : file.name,
      ACL: 'public-read',
      ContentType: 'image/jpeg'
    };
    client.upload(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Uploaded in:", data.Location);
      }
    });
  });
};
