const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./Routes/Users');
const login = require('./Routes/login')


const app = express();


app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/users', users);
app.use('/api/login', login);



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
