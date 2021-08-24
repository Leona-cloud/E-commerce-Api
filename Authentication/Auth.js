const Joi = require('@hapi/joi');


    const userSchema = Joi.object({
        userName: Joi.string().required(),
        Address: Joi.string().required(),
        altAddress: Joi.string().required(),
        phoneNumber: Joi.number().required().min(12).max(12),
        Email: Joi.string()
        .required()
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().min(8).max(12),
        password2: Joi.ref('password'),
    }) 
    .with('password', 'password2 ')

module.exports = { userSchema }