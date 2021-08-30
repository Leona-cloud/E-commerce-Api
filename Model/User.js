const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");

const User =  mongoose.model('User', new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 12
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: new PasswordComplexity({
        min: 8,
        max: 25,
        lowercase: 1,
        uppercase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    }),
    password2: {
        type: String,
        required: true,
         minlength: 8,
        maxlength: 1024
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
        userName: Joi.string().required().min(5).max(20),
        address: Joi.string().required(),
        altAddress: Joi.string().required(),
        phoneNumber: Joi.string().required().min(11).max(11),
        email: Joi.string().required().trim().lowercase().email(),
        password: new PasswordComplexity({
            min: 8,
            max: 25,
            lowercase: 1,
            uppercase: 1,
            numeric:1,
            symbol: 1,
            requirementCount: 4
        }),
        password2: Joi.ref('password'),
    })
    .with('password', 'password2 ');
        
     return schema.validate(user);
};

function loginValidation(user){
    const logSchema = Joi.object({
        email: Joi.string().required().trim().lowercase().email(),
        password: Joi.string().required().min(8).max(12),
    })
    return logSchema.validate(user)
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validation = loginValidation;
