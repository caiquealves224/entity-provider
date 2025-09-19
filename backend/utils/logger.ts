import winston from 'winston';

import { env } from './env.ts';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { app: env.APP_NAME, env: env.NODE_ENV },
  transports: [
    new winston.transports.Console({
      forceConsole: true,
    }),
  ],
});

export default logger;