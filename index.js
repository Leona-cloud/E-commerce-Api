const express = require("express")
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

// use a convention like app.use("/api/users", users);
app.use('/', require('./Routes/route')) // this line is redundant.
app.use('/Users', require('./Routes/Users'));// extract require() in to a const

app.use(express.urlencoded({extended: false}));

dotenv.config();




mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, ()=>{
    console.log("connected to the server")
});



app.listen(3000, ()=>{
    console.log('server is running');
})