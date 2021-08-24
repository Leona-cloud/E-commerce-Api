const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const { userSchema } = require('../Authentication/Auth');
const  Joi = require('@hapi/joi');


router.post('/register', async(req, res)=>{
    const validation = userSchema.validate(req.body, {
        abortEarly: false
    });
    return res.send(validation);

    const user = new User({
        userName: req.body.userName,
        altAddress: req.body.altAddress,
        phoneNumber: req.body.phoneNumber,
        Address: req.body.Address,
        Email: req.body.Email,
       password: req.body.password,
        password2: req.body.password2
    });
    const password = req.body.password
    const password2 = req.body.password2;
    if(password !== password2){
        try{
            res.send("Invalid make sure passwords match");
        }catch (ex){
            console.log(ex.message);
        }
    }
   
    try {
        const result = await user.save();
        console.log(result);
        res.send(user)
    } catch (ex) {
        console.log(ex.message);
    }

   
});


router.post("/login", async(req, res)=>{
  
    const login = new User({
        Email: req.body.Email,
        password: req.body.password
    })
    try {
        const result = await login;
        console.log(result);
        res.send("logged in")
        }
        catch (ex) {
        console.log(ex.message);
    }
});




module.exports = router;
