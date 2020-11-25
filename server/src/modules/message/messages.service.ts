import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Conversation } from '../../entities/Conversation.entity';
import { Message } from '../../entities/Message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>
  ) {}

  async saveMessage(conversationId: number, message: string, senderId: number): Promise<Message> {
    const newMessage = await this.messageRepository.save({ conversationId, senderId, message });

    const conversation = await this.conversationRepository.findOne(conversationId);
    conversation.updatedAt = newMessage.updatedAt;
    await this.conversationRepository.save(conversation);

    return newMessage;
  }
}
