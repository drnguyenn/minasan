import { BadRequestException, Body, Controller, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { memoryStorage } from 'multer';

import { User } from '../../entities/User.entity';
import { UserInfo } from '../../shared/Decorators/user-info.decorator';
import { File } from '../../shared/Interfaces/file.interface';
import { CreateUserDto, UpdateUserDto } from './users.dto';
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
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: { fileSize: 2097152 }, // 2MB --- 2*2^20
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
          ? callback(null, true)
          : callback(new BadRequestException('Only image files are allowed'), false);
      }
    })
  )
  @Patch('me')
  async updateMe(@Body() userDto: UpdateUserDto, @UserInfo() user: User, @UploadedFile() avatar: File): Promise<User> {
    const updatedUser = await this.service.updateUser(user, userDto, avatar);
    return plainToClass(User, updatedUser);
  }

  @ApiOperation({ summary: 'Create one User' })
  @Post()
  async createOne(@Body() dto: CreateUserDto): Promise<User> {
    const newUser = await this.service.createUser(dto);
    return plainToClass(User, newUser);
  }

  @ApiOperation({ summary: 'Get random users' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('random')
  async getRandomUsers(@UserInfo() user: User): Promise<Array<User>> {
    return this.service.getRandomUsers(user.id);
  }
}
