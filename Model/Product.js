const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    amountAvail: { // quantityInStock :
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
    }
});

const Product = mongoose.model('Product', productSchema);


module.exports.Product = Product;
