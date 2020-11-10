import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UserInfo } from 'src/shared/Decorators/user-info.decorator';

import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  @ApiOperation({ summary: 'Retrieve my User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  getMe(@UserInfo() user: User): User {
    return user;
  }

  @ApiOperation({ summary: 'Update my User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch('me')
  async updateMe(@Body() me: UpdateUserDto, @UserInfo() user: User): Promise<User> {
    const updatedUser = await this.service.updateUser(user.id, me);
    return plainToClass(User, updatedUser);
  }

  @ApiOperation({ summary: 'Create one User' })
  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<User> {
    const newUser = await this.service.createUser(dto);
    return plainToClass(User, newUser);
  }
}
