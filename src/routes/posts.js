var express = require('express');
var router = express.Router();
const post_service = require('../services/post.js');

router.get('/', post_service.fetchPost);
router.post('/', post_service.createPost);
router.get('/recent', post_service.fetchRecentPosts);

module.exports = router;