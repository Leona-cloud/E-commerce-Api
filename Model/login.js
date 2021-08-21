const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');


const loginSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        minlenght: 15,
        maxlenght: 25
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 25
    }
});
const Login = mongoose.model('Login', loginSchema);
module.exports = Login;