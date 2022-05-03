var express = require('express');
var router = express.Router();
const cart_service = require('../services/cart.js');

router.get('/', cart_service.fetchCart);
router.post('/', cart_service.addToCart);
router.delete('/', cart_service.removeFromCart);
router.post('/buy/', cart_service.buyCart);

module.exports = router;