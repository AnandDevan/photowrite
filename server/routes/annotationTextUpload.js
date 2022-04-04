var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');


router.post('/upload-annotation-text', function (req, res, next) {
  var imageUUId = req.body["imageUUid"];
  var text = req.body["text"];

  console.log(imageUUId, text);

  try {
    var filePath = `public/uploads/${imageUUId}.json`;
    var data = {
      version: -1,
      'annotations': [],
      'annotationText': []
    };
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath));
    }
    if (!data['annotationText']) {
      data['annotationText'] = [];
    }
    data['annotationText'].push(text);
    data['version'] += 1;

    fs.writeFile(filePath, JSON.stringify(data), function(err) {
      res.send({version: data['version']});
    });
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;
