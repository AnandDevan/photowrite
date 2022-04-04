var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');

router.get('/events/:image_id', function (req, res) {
  console.log(`req id = ${req.params.image_id}`);
  console.log('Got /events');
  // console.log(res);
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();


  var count = 1;
  let interval = setInterval(function generateAndSendRandomNumber(){
    var filePath = `public/uploads/${req.params.image_id}.json`;
    var data = {
      version: -1,
      'annotations': []
    };
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath));
    }
 
    var ret = res.write(`data: ${data['version']}\n\n`) //sendEventStreamData(data);
    console.log(`Sent event ${req.params.image_id}: ${ret}`);
  }, 15000);

  res.socket.on('close', function () {
    console.log('Closing CONNECTION');
    clearInterval(interval);
    // res.end();
  });
});

module.exports = router;
