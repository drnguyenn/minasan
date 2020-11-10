import { Logger } from '@nestjs/common';
import sqlFormatter from 'sql-formatter';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

/**
 * Effectively ripped out from:
 * https://github.com/typeorm/typeorm/blob/master/src/logger/SimpleConsoleLogger.ts
 */
export class SqlLogger implements TypeOrmLogger {
  private logger = new Logger();

  constructor(private options?: LoggerOptions) {}

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    if (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.indexOf('query') !== -1)
    ) {
      this.logger.log(
        'Query\n' +
          sqlFormatter.format(query) +
          (parameters && parameters.length ? '\nPARAMETERS:' + this.stringifyParams(parameters) : ''),
        'PostgreSQL'
      );
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    if (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.indexOf('error') !== -1)
    ) {
      this.logger.error(
        'Failed Query\n' +
          sqlFormatter.format(query) +
          (parameters && parameters.length ? '\nPARAMETERS: ' + this.stringifyParams(parameters) : ''),
        null,
        'PostgreSQL'
      );
      this.logger.error(error, error, 'PostgreSQL');
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    this.logger.log(
      'Slow Query\n' +
        sqlFormatter.format(query) +
        (parameters && parameters.length ? '\nPARAMETERS:' + this.stringifyParams(parameters) : ''),
      'PostgreSQL'
    );
    console.log(`\nExecution time: ` + time);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): void {
    if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('schema') !== -1)) {
      this.logger.log(message, 'PostgreSQL');
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): void {
    this.logger.log(message, 'PostgreSQL');
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): void {
    switch (level) {
      case 'log':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('log') !== -1))
          this.logger.log(message, 'PostgreSQL');
        break;
      case 'info':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('info') !== -1))
          this.logger.debug(message, 'PostgreSQL');
        break;
      case 'warn':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.indexOf('warn') !== -1))
          this.logger.warn(message, 'PostgreSQL');
        break;
    }
  }

  protected stringifyParams(parameters: any[]): any {
    try {
      return JSON.stringify(parameters, null, 2);
    } catch (error) {
      return parameters;
    }
  }
}
