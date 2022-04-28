const mongoose = require('mongoose');

const cart = new mongoose.Schema({ 
    user_id: {type: Schema.types.ObjectId, required: true, ref: "user", unique: true},
    items: [{
        _id: {type: Schema.types.ObjectId, required: true},
        product_id: {type: Schema.types.ObjectId, required: true}
    }]
},
{versionKey: false});

module.exports = mongoose.model('cart', cart)