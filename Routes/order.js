const express = require('express');
const { Cart } = require('../Model/cart');
const router = express.Router();
const { Order } = require('../Model/Order')


router.get('/', async(req, res)=>{
    const orderList = await Order.find();
    if(!orderList){
        res.status(500).json({success:false, message: 'order does not exist'})
   }
   res.send(orderList)
})

router.post('/', async(req, res)=>{
    const cartId = Promise.all(req.body.Cart.map(async cart=>{
        let newCartItem = new Cart({
            quantity = cart.quantity,
            product = cart.product
        })

        newCartItem = await newCartItem.save();

        return newCartItem._id
    }))

    const resolvedCart = await cartId

    let order = new Order({
        Cart: resolvedCart,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        country: req.body.country,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        User: req.body.User
    });

    try {
       order = await order.save();
       res.send(order)
    } catch (err) {
        return res.status(500).json({success: false, message: err})
    }
})





module.exports = router 