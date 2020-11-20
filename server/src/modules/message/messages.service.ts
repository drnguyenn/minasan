import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from 'src/entities/Message.entity';
import { Conversation } from 'src/entities/Conversation.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,

  ){}

  async getMessageHistory(conversationId: number,  page: number, limit: number) {
    const messageHistory = await this.messageRepository.find({
      where: { conversationId },
      order: {
        createdAt: "DESC"
      },
      skip: limit*(page - 1),
      take: limit
    })

    return messageHistory
  }

  async saveMessage(conversationId: number, senderId: number, message: string) {
    await this.messageRepository.insert({
      conversationId,
      senderId,
      message,
    });

    // Update conversation last message time.
    const conversation = await this.conversationRepository.findOne(conversationId);
    conversation.updatedAt = new Date();
    await this.conversationRepository.save(conversation);

    return { status: 'Success' };
  }
}
