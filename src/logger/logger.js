const DailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format } = require('winston');
const { combine, timestamp, label } = format;
const path = require('path');

const options = {
    file: {
        level: 'info',
        filename: path.resolve(`${logDir}/%DATE%.log`),
        datePattern: 'YYYYMMDD',
        json: true,
        colorize: true,
    },
    errorFile: {
        level: 'error',
        filename: path.resolve(`${logDir}/%DATE%_error.log`),
        datePattern: 'YYYYMMDD',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const logger = createLogger({
    format: combine(
        label({ label: 'code-food' }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss.SSSZZ' }),
        format.json(),
    ),
    transports: [
        new DailyRotateFile(options.file),
        new DailyRotateFile(options.errorFile),
    ],
    exitOnError: false,
});

module.exports = { logger };
