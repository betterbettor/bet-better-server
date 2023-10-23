import { createLogger, transports, format, Logger, LoggerOptions } from 'winston';

const options: LoggerOptions = {
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.printf(({ level, timestamp, message }) => {
      return `${level}::"${timestamp}" : ${message}`;
    }),
  ),
  defaultMeta: { service: 'Render' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.splat(),
        format.printf(({ level, timestamp, message }) => {
          return `${level}::"${timestamp}" : ${message}`;
        }),
      ),
    }),
    new transports.File({ filename: 'server-error.log', level: 'error' }),
    new transports.File({ filename: 'server.log' }),
  ],
};

const logger: Logger = createLogger(options);

export default logger;
