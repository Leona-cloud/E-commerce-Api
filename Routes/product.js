const auth = require('../middleware/auth')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = require('./Users');
const { Product } = require('../Model/Product')

router.get('/', async(req, res)=>{
    
        const products = await Product.find().sort('productName')
        res.send(products)
});

router.post('/', async(req, res)=>{
    try{
    let product = new Product(_.pick(req.body, ['productName', 'amountAvail', 'description', 'Price', 'discount']));
    product = await product.save();
    res.send(product)
    console.log(product)
    }catch(ex){
        console.log(ex)
    }
})


module.exports = router;