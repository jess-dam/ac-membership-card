var express = require('express');
var router = express.Router();

/* GET default home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  req.status(100).json({
      message: 'hello'
  })
});

module.exports = router;