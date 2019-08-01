//const asyncMiddleware = require('../middlewares/async');
const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const winston = require('winston');
const express = require('express');
const admin = require('../middlewares/admin');
const { Genre , validate } = require('../models/genre');
const router = express.Router();




router.get('/' , async (req , res) =>{

    
        //throw new Error('Couldnot get the Genre');
        
        const genres = await Genre.find().sort('name');
        res.send(genres);
    
});

router.post('/' , auth , async (req , res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

        let genre = new Genre({ name : req.body.name });

        await genre.save();
        
        res.send(genre);

  
});

router.put('/:id' , auth , async (req , res) =>{

    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id , {name : req.body.name } , {
        new : true
    });

    if(!genre) return res.status(404).send('The genre with this ID is not available');

    res.send(genre);
});

router.delete('/:id' , [auth , admin] ,async (req , res)=>{
   const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('The genre with this ID is not available');

    res.send(genre);

});

router.get('/:id' , validateObjectId , async (req , res)=>{

    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('The genre with this ID is not available');
    res.send(genre);

});

module.exports = router;