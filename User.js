const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        min: 7,
        max: 256
    },
    lastName: {
        type: String,
        required: true,
        min: 7,
        max: 256
    },
    email: {
        type: String,
        required: true,
        min: 20,
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 10
    },
    password2: {
        type: String,
        required: true,
        min: 8,
        max: 10
    }
});

const User = mongoose.model('User', Userschema);
module.exports = User;