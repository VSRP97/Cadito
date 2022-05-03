var express = require('express');
var router = express.Router();
const history_service = require('../services/history.js');

router.get('/', history_service.fetchHistory)

module.exports = router;