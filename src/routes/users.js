var express = require('express');
var router = express.Router();
const user_service = require('../services/user.js');

/* GET users listing. */
router.get('/', user_service.fetchUser)
router.post('/register', user_service.register)
router.post('/login', user_service.login)
router.post('/prev-login/', user_service.prev_login)

module.exports = router;