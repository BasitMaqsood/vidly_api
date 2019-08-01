const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const router = express.Router();

router.post('/' , async (req , res) =>{

    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid Email or Password ...');

   const validPassword = await bcrypt.compare(req.body.password , user.password);
   if(!validPassword) return res.status(400).send('Invalid Email or Password ...');

   try{
        const token = user.generateAuthToken();
        res.send(token);
        res.send(true);

   }catch(ex){
    console.error(ex);
   }
});

function validate(req){
    schema = {
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req , schema);
}

module.exports = router;