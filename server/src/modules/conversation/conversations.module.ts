import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/Conversation.entity';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { User } from 'src/entities/User.entity';


@Module({
  controllers: [ConversationsController],
  imports: [TypeOrmModule.forFeature([Conversation, User])],
  providers: [ConversationsService],
})
export class ConversationModule {}