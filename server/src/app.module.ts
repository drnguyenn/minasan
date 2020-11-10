import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from './core/Config/ormconfig';
import { HttpRequestLogger } from './core/Loggers/http-request.logger';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(ormConfig)],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      consumer.apply(HttpRequestLogger).forRoutes('*');
    }
  }
}
