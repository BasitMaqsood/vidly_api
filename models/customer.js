const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer' , new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
}));

function validationCustomer(customer){
    schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer , schema);
}

//Exporting Validation Fucntion and Customer Model
exports.Customer = Customer;
exports.validate = validationCustomer;