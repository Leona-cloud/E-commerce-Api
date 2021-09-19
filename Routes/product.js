const auth = require('../middleware/auth')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const { Product, validP } = require('../Model/Product')

router.get('/', async(req, res)=>{
    
        const products = await Product.find().sort('productName')
        res.send(products)
});

router.post('/', async(req, res)=>{
    const { error } = validP(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
    let product = new Product(_.pick(req.body, ['productName', 'quantityInStock', 'description', 'price', 'discount', 'color']));
    product = await product.save();
    res.send(product)
    console.log(product)
    }catch(ex){
        console.log(ex)
    }
});

router.put('/:id', async(req, res)=>{
    const { error } = validP(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = await Product.findByIdAndUpdate(req.params.id, {productName: req.body.productName},{
        new: true
    });
    if(!product) return res.status(400).send("Product not found");
    res.send(product);
})




module.exports = router;
