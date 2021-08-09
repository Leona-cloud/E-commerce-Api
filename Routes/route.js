const express = require('express')
const router = express.Router();
const User = require('../model/User');

//Login 
router.get('/ ', async(req, res)=>{
    res.send("Login")
})

//Register
module.exports = router;