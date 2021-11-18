const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

exports.Cart = mongoose.model('Cart', cartSchema)