const Joi = require('joi');
const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    itemName:{
        type: String
    },
    Description: {
        type: String,
        required: true,
    }
})