import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Conversation } from '../../entities/Conversation.entity';
import { Message } from '../../entities/Message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}
