import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrmConfig } from './core/Config/orm.config';
import { HttpRequestLogger } from './core/Loggers/http-request.logger';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationModule } from './modules/conversation/conversations.module';
import { HobbiesModule } from './modules/hobbies/hobbies.module';
import { MessagesModule } from './modules/message/messages.module';
import { UsersModule } from './modules/users/users.module';
import { WsModule } from './modules/ws/ws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(OrmConfig),
    AuthModule,
    ConversationModule,
    HobbiesModule,
    MessagesModule,
    UsersModule,
    WsModule
  ],
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
