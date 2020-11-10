import { Logger } from '@nestjs/common';
import morgan from 'morgan';

const logger = new Logger();

export const HttpRequestLogger = morgan('dev', {
  stream: { write: (message) => logger.log(message.substring(0, message.lastIndexOf('\n')), 'HTTP Request') }
});
