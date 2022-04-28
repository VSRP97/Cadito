var express = require('express');
var router = express.Router();
const user_service = require('../services/user.js');

/* GET users listing. */
router.get('/', user_service.fetchUser)

router.post('/register', user_service.register)

module.exports = router;