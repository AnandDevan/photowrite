var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/annotate', function (req, res, next) {
  res.render('annotate', { title: 'Load image and annotate' });
});

module.exports = router;
