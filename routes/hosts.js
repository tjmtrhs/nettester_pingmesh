var express = require('express');
var config = require('../config/config');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(Object.keys(config.hosts));
});

module.exports = router;
