const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlenght: 12,
        maxlenght: 12
    },
    Email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 12
    },
    password2: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 12
    },
    Address: {
        type: String,
        required: true
    },
    altAddress: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('User', userSchema);


