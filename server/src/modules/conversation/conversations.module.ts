import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Conversation } from '../../entities/Conversation.entity';
import { User } from '../../entities/User.entity';
import { WsModule } from '../ws/ws.module';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  controllers: [ConversationsController],
  imports: [TypeOrmModule.forFeature([Conversation, User]), WsModule],
  providers: [ConversationsService]
})
export class ConversationModule {}
