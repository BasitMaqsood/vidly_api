const express = require("express");
const logger = require("../middlewares/logger");
const auth = require("../middlewares/authentication");
//Route middleware
const userRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //customize middlewares
  app.use(logger);
  app.use(auth);

  //routers
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);

  app.use(error); //passing reference to this function
};
