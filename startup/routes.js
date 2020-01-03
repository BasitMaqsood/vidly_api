const express = require('express');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/authentication');
//Route middleware
const genresRoute = require('../routes/genres');
const customerRoute = require('../routes/customers');
const movieRouter = require('../routes/movies');
const rentalRoute = require('../routes/rentals');
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth');
const homeRoute = require('../routes/home');
const error = require('../middlewares/error');

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //customize middlewares
    app.use(logger);
    app.use(auth);

    //routers 
    app.use('/api/genres' , genresRoute);
    app.use('/api/customers' , customerRoute);
    app.use('/api/movies' , movieRouter);
    app.use('/api/rentals' , rentalRoute);
    app.use('/api/users' , userRoute);
    app.use('/api/auth' , authRoute);
    app.use('/' , homeRoute);

    app.use(error); //passing reference to this function
}