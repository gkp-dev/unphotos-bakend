const winston = require('winston')

module.exports = function() {

    //Create Log file
    const file = new winston.transports.File({ filename: 'error.log' });
    winston.add(file)

    //Handling error outside express

    process.on('uncaughtException', (ex) => {
        const log = new winston.transports.Console();
        winston.add(log);
        console.log('We got an uncaught exception')
        winston.error(ex.message, ex);
        winston.remove(log);
    })

    process.on('unhandleRejection', (ex) => {
        const log = new winston.transports.Console();
        winston.add(log);
        console.log('We got an UNHANDLED PROMISE REJECTION')
        winston.error(ex.message, ex);
        winston.remove(log);
    })

}