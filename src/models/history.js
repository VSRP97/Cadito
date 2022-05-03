const mongoose = require('mongoose');

const history = new mongoose.Schema({ 
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
    created_date: {type: Date, default: Date.now},
    items: [{
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        product_id: {type: mongoose.Schema.Types.ObjectId, required: true}
    }]
},
{versionKey: false});

module.exports = mongoose.model('history', history)