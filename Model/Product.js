const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const productSchema = new mongoose.Schema({
    
    productName: {
        type: String,
        required: true,
    },
    quantityInStock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
   
},{timestamps: true});
productSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

const Product = mongoose.model('Product', productSchema);


function productValidation(product){
    const schema = Joi.object({
        productName: Joi.string().required().trim().lowercase(),
        amountAvail: Joi.string().required().min(0).max(12),
        description: Joi.string().required(),
        price: Joi.string().required()
    })
    return schema.validate(product)
};


module.exports.Product = Product;

module.exports.validP = productValidation;
