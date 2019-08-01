const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email:{
        type: String,
        unique:true,
        minlength: 5,
        maxlength: 255,
        required:true
    },
    password:{
        type: String,
        minlength: 5,
        maxlength: 1024,
        required:true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id , isAdmin: this.isAdmin } , config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User' , userSchema);

function validationUser(user){
    schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user , schema);
}

exports.User = User;
exports.validate = validationUser; 