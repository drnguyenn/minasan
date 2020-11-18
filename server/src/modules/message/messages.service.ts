import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>){}

  async getMessageHistory(userOneId: number, userTwoId: number,  page: number, limit: number) {
    const messageHistory = await this.messageRepository.find({
      where: [
        { senderId: userOneId, recipientId: userTwoId },
        { senderId: userTwoId, recipientId: userOneId },
      ],
      order: {
        createdAt: "DESC"
      },
      skip: limit*(page - 1),
      take: limit
    })

    return messageHistory
  }

  async saveMessage(senderId: number, recipientId: number, message: string) {
    await this.messageRepository.insert({
      senderId,
      recipientId,
      message,
    });
  }
}
