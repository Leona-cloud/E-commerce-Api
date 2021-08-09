const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const validation = require('../Validation/Validation')

router.get('/login', async(req, res)=>{
    res.send(User)
});


router.post('/login', async(req, res)=>{

})


router.post('/register', async(req, res)=>{
    const user = new user({
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2

       
    });
    let errors = []

    if(!firstName || !email || !password || !lastName || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    if(password !==  password2){
        errors.push({msg: 'Passwords do not match!!'})
    }
    if(errors.length > 0){
        res.render('html', {
            errors,
            firstName,
            email,
            password2,
            password
        })
    }else{
        User.findOne({email: email})
        .then(user =>{
            if(user){
                //if user exists
                errors.push({msg: 'Email already exists'})
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