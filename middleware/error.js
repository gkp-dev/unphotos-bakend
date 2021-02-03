const winston = require('winston');
winston.add(new winston.transports.Console())

module.exports = function(err, req, res, next) {
    winston.error(err.message, err)
    res.status(500).json('Somehing failed...')
}