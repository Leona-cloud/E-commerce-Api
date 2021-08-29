const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const router = express.Router();
const {User, validation}= require('../Model/User');
const  Joi = require('joi');


router.post("/login", async(req, res)=>{
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User not registered please sign up');

    const login = new User(_.pick(req.body), ['email', 'password']);
    try {
        const result = await login;
        console.log(result);
        res.send("logged in");
        }
        catch (ex) {
        console.log(ex.message);
    };
});



module.exports = router;
