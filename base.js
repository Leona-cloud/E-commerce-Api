const express = require("express");
const dotenv = require('dotenv');
const config = require('config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./Routes/Users');
const login = require('./Routes/login');
const product = require('./Routes/product');


const app = express();


app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use('/api/users', users);
app.use('/api/user', login);
app.use('/api/product', product);

if(!config.get('jwtPrivateKey')){
    console.log('Fatal Error : jwtPrivateKey is not defined');
    process.exit(1);
}

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
{useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(()=> console.log("connected"))
    .catch(err => console.error("unable to connect", err));






const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`server is running on port ${port}.....`);
});
