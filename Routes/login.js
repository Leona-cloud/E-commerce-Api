const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const {User, validation}= require('../Model/User');
const  Joi = require('joi');


router.post("/login", async(req, res)=>{
    req.header // why is this hanging here

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User not registered please sign up');
     
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password'); // you don't want to say what really went
    //wrong.. "invalid email or password "
    
    const token = user.generateAuthToken();
    res.send(token);



});



module.exports = router;
