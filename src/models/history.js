const mongoose = require('mongoose');

const history = new mongoose.Schema({ 
    user_id: {type: Schema.types.ObjectId, required: true, ref: "user"},
    created_date: {type: Date, default: Date.now},
    items: [{
        _id: {type: Schema.types.ObjectId, required: true},
        product_id: {type: Schema.types.ObjectId, required: true}
    }]
},
{versionKey: false});

module.exports = mongoose.model('history', history)