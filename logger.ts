const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Set desired log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'test.log' }), // Log to a file
    ],
});

module.exports = logger;