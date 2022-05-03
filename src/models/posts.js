const mongoose = require('mongoose');

const post = new mongoose.Schema({ 
    owner_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
    image_url: {type: String, required: true},
    display_name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    created_date: {type: Date, default: Date.now}, },
{versionKey: false});

module.exports = mongoose.model('post', post)