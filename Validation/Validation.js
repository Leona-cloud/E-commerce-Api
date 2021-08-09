const Joi = require('joi');

const regValidation = (data) =>{
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        password: Joi.string().min(8).max(12).required(),
        password2: Joi.string().min(8).max(12).required(),
    });
    return Joi.validate(data, schema);
}

const loginValidation = (data) =>{

    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(8).max(12).required()
    });

    return Joi.validate(data, schema);
}


module.exports.regValidation = regValidation,
module.exports.loginValidation = loginValidation