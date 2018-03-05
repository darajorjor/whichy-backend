import winston from 'winston'
// import RavenTransport from './raven.transport';

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    // new RavenTransport({
    //   level: 'error',
    // }),
  ],
})

export default logger
