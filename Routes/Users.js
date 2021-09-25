const auth = require('../middleware/auth')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const {User, validate}= require('../Model/User');
const  Joi = require('joi');

router.get('/me', auth, async(req, res)=>{
    try {
        const user = await User.findById(req.user._id).select('userName email');
        res.send(user); 
    } catch (ex) {
        res.status(500).send('Something Failed.....')
    }
    
});

router.post('/register', async(req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email: req.body.email});
   if (user) return res.status(400).send('User already registered');

     user = new User(_.pick(req.body, ['userName', 'address', 'altAddress', 'email', 'phoneNumber', 'password', 'password2']));
    
    const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);
     user.password2 = await bcrypt.hash(user.password2, salt);

     const password = req.body.password;
    const password2 = req.body.password2;
    if(password !== password2){
        return res.send("make sure passwords match");
    };
   
    try {
        const result = await user.save();
        console.log(result);
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'userName', 'email']));
    } catch (ex) {
        console.log(ex.message);
    }

   
});





module.exports = router;
