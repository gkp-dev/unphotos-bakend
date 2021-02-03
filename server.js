const express = require('express');
const dotenv = require('dotenv').config();
require('express-async-errors');
const winston = require('winston');
const app = express();
require('./db/mongoose');
require('./startup/handleLog')

//Extracting Routs
require('./startup/routes')(app, express)




const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log(`My app is listening on port ${port}...`);
})