import { Module } from '@nestjs/common';

import { MessagesModule } from '../message/messages.module';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [MessagesModule],
  providers: [WsGateway]
})
export class WsModule {}
