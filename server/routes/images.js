var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/images', function (req, res, next) {

	var files = fs.readdirSync('public/uploads').filter(fn => fn.endsWith('.png'));
	ids = files.map(f => f.replace(/\.[^/.]+$/, ""));
  res.send(ids);
});

module.exports = router;
