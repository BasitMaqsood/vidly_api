const express = require('express');
const router = express.Router();

router.get('/' , (req , res)=>{
    res.send('Hello Oxford !!!');
});

module.exports = router;
