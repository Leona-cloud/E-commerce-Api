const express = require('express');
const Joi = require('joi');
const router = express.Router();

const Login = require('../Model/login');


router.get("/login", async(req, res)=>{
    const login = await Login.find();
    res.send(Login);
});

router.post("/login", async(req, res)=>{
    const login = new Login({
    Email: req.body.Email,
    password: req.body.password
    });
    try {
        const result = await login.save();
        console.log(result);
        res.send("logged in")
    } catch (ex) {
        console.log(ex.message);
    }
});


module.exports = router;