import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { MessagesModule } from '../message/messages.module';

@Module({
  providers: [WsGateway],
  imports: [MessagesModule],
})
export class WsModule {}