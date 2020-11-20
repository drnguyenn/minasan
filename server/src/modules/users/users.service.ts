import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from 'src/entities/User.entity';
import { UserResponse } from './user-response.dto';

const RANDOM_USERS_TO_GET = 5;
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private authService: AuthService) {}

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

  async getRandomUsers(currentUserId: number): Promise<Array<UserResponse>> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where("user.id != :currentUserId", { currentUserId })
      .orderBy("RANDOM()")
      .limit(RANDOM_USERS_TO_GET)
      .getMany()

    const response = users.map(user => new UserResponse(user));
    return response;
  }
}
