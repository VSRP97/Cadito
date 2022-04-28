var express = require('express');
var router = express.Router();
const user_model = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register')

module.exports = router;