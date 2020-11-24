import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { Conversation } from '../../entities/Conversation.entity';
import { User } from '../../entities/User.entity';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

const RANDOM_USERS_TO_GET = 5;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
    private authService: AuthService
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { name, email, password } = dto;
    const hashedPassword = this.authService.hashPassword(password);
    try {
      return await this.userRepository.save({ name, email, hashedPassword });
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new InternalServerErrorException();
    }
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    let hashedPassword: string;
    const { password, ...others } = dto;
    const user = await this.userRepository.findOne(id);
    if (password) hashedPassword = this.authService.hashPassword(dto.password);
    try {
      return await this.userRepository.save({ ...user, ...others, ...(password && { hashedPassword }) });
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new InternalServerErrorException();
    }
  }

  async getRandomUsers(userId: number): Promise<User[]> {
    // Exclude matched users from search result
    const conversations = await this.conversationRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }]
    });

    const matchedUserIds = conversations.map((conversation: Conversation) => {
      return conversation.user1.id === userId ? conversation.user2.id : conversation.user1.id;
    });

    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id != :userId', { userId })
      .andWhere('user.id NOT IN (:...matchedUserIds)', { matchedUserIds })
      .orderBy('RANDOM()')
      .limit(RANDOM_USERS_TO_GET)
      .getMany();

    return users.map((user) => plainToClass(User, user));
  }
}
