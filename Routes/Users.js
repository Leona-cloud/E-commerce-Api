const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {User, validate}= require('../Model/User');
const  Joi = require('joi');


router.post('/register', async(req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email: req.body.email});
   if (user) return res.status(400).send('User already registered');

     user = new User(_.pick(req.body, ['userName', 'address', 'altAddress', 'email', 'phoneNumber', 'password', 'password2']));
    const password = req.body.password;
    const password2 = req.body.password2;
    if(password !== password2){
        try{
            res.send("Invalid make sure passwords match");
        }catch (ex){
            console.log(ex.message);
        };
    };
   
    try {
        const result = await user.save();
        console.log(result);
        res.send(_.pick(user, ['_id', 'userName', 'email']));
    } catch (ex) {
        console.log(ex.message);
    }

   
});





module.exports = router;







module.exports = router;
