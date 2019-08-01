const winston = require('winston');
const express = require('express');
app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 9000;
const server = app.listen(3000 , () => winston.info(`Server is listening at port ${port} ...`));

module.exports = server;


