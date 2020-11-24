import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Conversation } from '../../entities/Conversation.entity';
import { User } from '../../entities/User.entity';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  controllers: [ConversationsController],
  imports: [TypeOrmModule.forFeature([Conversation, User])],
  providers: [ConversationsService]
})
export class ConversationModule {}
