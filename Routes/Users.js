const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const validation = require('../Validation/Validation');

// Implement login route
router.post('/login', async(req, res)=>{
     const Validation = schema.validate(req.body);
    
    const login = new user({
        email: req.body.email,
        password: req.body.password
    });
});

// you didnt use your validation to check [req]
router.post('/register', async(req, res)=>{

    const Validation = schema.validate(req.body);

    const user = new user({
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2

       
    });
    if(password !==  password2){
        return res.status(400).send('Password does not match');
    }
    if(error){
        return (error);
    }else{
        User.findOne({email: email})
        await Promise.then(user =>{
            if(user){
                //if user exists
                return res.send("Email already exists");
                
            }else{
                const newUser = new User({
                    firstName,
                    lastName, 
                    email, 
                    password
                });
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;

                    newUser.password = hash;
                }))
            }
        });
    }
});




module.exports = router;
