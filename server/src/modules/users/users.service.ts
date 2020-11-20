import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from 'src/entities/User.entity';

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
}
