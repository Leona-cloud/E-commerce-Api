const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const validation = require('../Validation/Validation')

// This is not needed.
router.get('/login', async(req, res)=>{
    res.send(User)
});

// Implement login route
router.post('/login', async(req, res)=>{

})

// you didnt use your validation to check [req]
router.post('/register', async(req, res)=>{
    // consider using a library like lodash for this.
    const user = new user({
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2

       
    });
    let errors = []

    // you created a validation and ignored it.. now you are checking   
    // manually. change this implementation to use your Joi validation.
    if(!firstName || !email || !password || !lastName || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    if(password !==  password2){
        errors.push({msg: 'Passwords do not match!!'})
    }
    // remove this method of pushing errors into a list.
    //Example of how it should be:  return res.status(400).send("my error message.");
    if(errors.length > 0){
        res.render('html', {
            errors,
            firstName,
            email,
            password2,
            password
        })
    }else{
        // use async - await instead of promise, you are in an async function
        User.findOne({email: email})
        .then(user =>{
            if(user){
                //if user exists
                errors.push({msg: 'Email already exists'})
                // no need to render.. just send your response to the client.
                res.render('html file', {
                        errors,
                        firstName,
                        email,
                        password2,
                        password
                });
                
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