const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) res.status(401).send('Access denied. no token provided');
    try{
        const decoded = jwt.verify(token, process.env.ecommerce_jwtPrivateKey);
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send('invalid token')
    }
}

module.exports = auth;
