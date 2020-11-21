import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Conversation } from 'src/entities/Conversation.entity';
import { User } from 'src/entities/User.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createConversation(user1Id: number, user2Id: number) {
    // Check existence of user1 & user2
    const users = await this.userRepository.findByIds([user1Id, user2Id]);
    if (users.length !== 2) {
      throw new BadRequestException('user_does_not_exist');
    }

    //  Check if conversation for this pair exist or not
    const conversation = await this.conversationRepository.find({
      where: [
        { user1Id: user1Id, user2Id: user2Id },
        { user1Id: user2Id, user2Id: user1Id },
      ]
    });

    if (conversation.length > 0) {
      throw new BadRequestException('conversation_pair_existed');
    }

    await this.conversationRepository.insert({
      user1Id,
      user2Id,
    });

    return { status: 'Success'};
  }

  async getConversationHistory(userId: number): Promise<Array<Conversation>> {
    return this.conversationRepository.find({
      where: [
        { user1Id: userId },
        { user2Id: userId },
      ],
      order: {
        updatedAt: 'DESC',
      }
    });
  }
}
