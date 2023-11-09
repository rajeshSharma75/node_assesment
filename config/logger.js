const {createLogger,transports,format} = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
        filename: 'api_log.log',    
        level: 'info',
        options: {
          useUnifiedTopology: true,
        },
        format: format.combine(format.timestamp(),format.json())
    }),
  ],
});


module.exports = logger;