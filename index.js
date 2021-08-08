const express = require("express")
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

app.use('/', require('./Routes/route'))
app.use('/Users', require('./Routes/Users'));

app.use(express.urlencoded({extended: false}));

dotenv.config();




mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, ()=>{
    console.log("connected to the server")
});



app.listen(3000, ()=>{
    console.log('server is running');
})