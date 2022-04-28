const mongoose = require('mongoose');

const user = new mongoose.Schema({ 
    display_name: { type: String, required: true }, 
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, },
{versionKey: false})

module.exports = user