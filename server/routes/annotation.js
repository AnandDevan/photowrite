var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/annotation/:id', function (req, res, next) {
	console.log(`req id = ${req.params.id}`);
	res.sendfile(`public/uploads/${req.params.id}.json`)
});

module.exports = router;
