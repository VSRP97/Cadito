var express = require('express');
var router = express.Router();
const review_service = require('../services/reviews.js');

router.post('/', review_service.postReview);
router.get('/', review_service.fetchReviews);

module.exports = router;