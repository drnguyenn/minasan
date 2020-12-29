import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { Conversation } from '../../entities/Conversation.entity';
import { User } from '../../entities/User.entity';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private wsGateway: WsGateway
  ) {}

  async getConversations(userId: number): Promise<Array<Conversation>> {
    return await this.conversationRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }],
      order: { updatedAt: 'DESC' }
    });
  }

  async getConversation(conversationId: number, userId: number, limit: number, page: number): Promise<Conversation> {
    const conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoinAndSelect('conversation.messages', 'messages')
      .innerJoinAndSelect('conversation.user1', 'user1')
      .innerJoinAndSelect('conversation.user2', 'user2')
      .where('messages.conversationId = :conversationId', { conversationId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('conversation.user1Id = :userId', { userId }).orWhere('conversation.user2Id = :userId', { userId });
        })
      )
      .offset(limit * (page - 1))
      .limit(limit)
      .orderBy({ 'messages.updatedAt': 'ASC' })
      .getOne();

    return conversation ? conversation : await this.conversationRepository.findOne({ id: conversationId });
  }

  async createConversation(user1Id: number, user2Id: number): Promise<Conversation> {
    if (user1Id === user2Id) throw new BadRequestException('Users should not be the same');

    const partner = await this.userRepository.findOne(user2Id);
    if (!partner) throw new BadRequestException('Partner not exist');

    const conversations = await this.conversationRepository.find({
      where: [
        { user1Id: user1Id, user2Id: user2Id },
        { user1Id: user2Id, user2Id: user1Id }
      ]
    });

    if (conversations.length > 0) throw new BadRequestException('Conversation existed');

    const conversation = await this.conversationRepository.save({ user1Id, user2Id });
    this.wsGateway.handleNewRoom(user2Id, conversation.id);
    return conversation;
  }
}
