const express = require('express');
const Joi = require('joi');
const router = express.Router();
const User = require('../Model/User')

router.get('/register', async(req, res)=>{
    const user = await User.find();
    res.send(user);
})

router.post('/register', async(req, res)=>{
  
    const user = new User({
        fullName: req.body.fullName,
        altAdress: req.body.altAdress,
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
