const fs = require("fs");
const S3FS = require("s3fs");
const s3fsImpl = new S3FS("policephototaggingstorage/photos", {
  accessKeyId: "AKIAIPC5WDUR6SXASWTQ",
  secretAccessKey: "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"
});

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
    console.log("start");
    var files = req.files;
    var name = req.body.name;
    var file = files[name];
    console.log(file);
    console.log("done");
    console.log(file.path);
    var stream = fs.createReadStream(file.path);
    return s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
      fs.unlink(file.path, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });
  });
};
