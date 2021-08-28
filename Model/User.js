const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const User =  mongoose.model('User', new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
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
    address: {
        type: String,
        required: true
    },
    altAddress: {
        type: String,
        required: true
    }
}));


function validateUser(user){
    const schema = Joi.object({
        userName: Joi.string().required(),
        address: Joi.string().required(),
        altAddress: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        email: Joi.string().required().trim().lowercase().email(),
        password: Joi.string().required().min(8).max(12),
        password2: Joi.ref('password'),
    }); 
        
     return schema.validate(validateUser);
};


module.exports.User = User;
module.exports.validate = validateUser;
