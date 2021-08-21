const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 20
    },
    Email: {
        type: String,
        required: true,
        minlenght: 15,
        maxlenght: 25
    },
    Address: {
        type: String,
        required: true,
        minlenght: 150,
        maxlenght: 250
    },
    altAdress: {
        type: String,
        required: true,
        minlenght: 150,
        maxlenght: 250
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlenght: 11,
        maxlenght: 11
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 25
    },
    password2: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 25
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;