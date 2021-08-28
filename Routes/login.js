const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {User, validate}= require('../Model/User');
const  Joi = require('joi');


router.post("/login", async(req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const login = new User({
        email: req.body.email,
        password: req.body.password
    });
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