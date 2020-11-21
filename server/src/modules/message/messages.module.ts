import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/Message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Conversation } from 'src/entities/Conversation.entity';

@Module({
  controllers: [MessagesController],
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
