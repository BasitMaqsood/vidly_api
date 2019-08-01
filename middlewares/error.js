const winston = require('winston');

module.exports = function(err , req , res , next){
    //Log the Exception
    winston.error(err.message , err);
    res.status(500).send('Something Failed ....');
}