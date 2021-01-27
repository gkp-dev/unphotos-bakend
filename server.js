const express = require('express');
const dotenv = require('dotenv').config();
require('express-async-errors');
const winston = require('winston');
const cors = require('cors');
const app = express();

const db = require('./db/mongoose');
const api = require('./routes/api/api');
const error = require('./middleware/error')

//Create Log file
const file = new winston.transports.File({ filename: 'error.log' });
winston.add(file)

winston.add(new winston.transports.Console())


app.use(cors());
app.use(express.json());
app.use('/api', api);
app.use(error);

const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log(`My app is listening on port ${port}...`);
})