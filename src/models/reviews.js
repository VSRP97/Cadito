const mongoose = require('mongoose');

const review = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, required: true, ref: "user"},
    product_id: {type: Schema.Types.ObjectId, required: true, ref: "post"},
    rating: {type: Number, required: true},
    description: {type: String, default : ""}
},
{versionKey: false});

module.exports = mongoose.model("review", review)