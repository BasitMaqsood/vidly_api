const auth = require('../middlewares/auth');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();


router.get('/' , async (req , res) =>{
    const cusotmers = await Customer.find().sort('name');
    res.send(cusotmers);
});

router.post('/' , auth , async (req , res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    try{
        const cusotmer = new Customer({ 
            isGold: req.body.isGold,
            name : req.body.name,
            phone: req.body.phone 
        });

        await cusotmer.save();
        
        res.send(cusotmer);
    }catch(ex){
        console.error(error.message);
    }
});

router.put('/:id' , auth , async (req , res) =>{

    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const cusotmer = await Customer.findByIdAndUpdate(req.params.id , {
        name : req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
        },
        {
        new : true
    });

    if(!cusotmer) return res.status(404).send('The customer with this ID is not available');

    res.send(cusotmer);
});

router.delete('/:id' , auth , async (req , res)=>{
   const cusotmer = await Customer.findByIdAndRemove(req.params.id);

    if(!cusotmer) return res.status(404).send('The customer with this ID is not available');

    res.send(cusotmer);

});

router.get('/:id' , async (req , res)=>{
    const cusotmer = await Customer.findById(req.params.id);
    if(!cusotmer) return res.status(404).send('The cusotmer with this ID is not available');
    res.send(cusotmer);

});




module.exports = router;