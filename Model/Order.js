const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    Cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    }],
    shippingAddress: {
        type: String,
        required : true
    },
    city: {
        type: String,
        required : true
    },
    country: {
        type:String,
        required:  true
    },
    status: {
        type: String,
        required : true,
        default : 'Pending......'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    User :{ 
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
});

exports.Order = mongoose.model('Order', orderSchema)