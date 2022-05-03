const mongoose = require('mongoose');

const cart = new mongoose.Schema({ 
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user", unique: true},
    items: [{
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "post"}
    }]
},
{versionKey: false});

module.exports = mongoose.model('cart', cart);