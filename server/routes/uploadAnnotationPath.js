var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');


router.post('/upload-annotation-path', function (req, res, next) {
  console.log("blah", req.body);
  var imageUUId = req.body["imageUUid"];
  var pathData = req.body["path"];
  console.log(pathData, typeof(pathData));

  try {
    var filePath = `public/uploads/${imageUUId}.json`;
    var data = {
      version: -1,
      'annotations': []
    };
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath));
    }
    data['annotations'].push(pathData);
    data['version'] += 1;

    fs.writeFile(filePath, JSON.stringify(data), function(err) {
      res.send({version: data['version']});
    });
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;
