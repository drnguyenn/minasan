import { Body, Controller, DefaultValuePipe, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Message } from '../../entities/Message.entity';
import { CreateMessageDto } from './messages.dto';
import { MessagesService } from './messages.service';

@ApiBearerAuth()
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}

  @ApiOperation({ summary: 'Retrieve message history between users' })
  @Get(':conversationId')
  @UseGuards(AuthGuard())
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number
  })
  async getMessageHistory(
    @Param('conversationId') conversationId: number,
    @Query('limit', new DefaultValuePipe(20)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number
  ): Promise<Message[]> {
    return this.messageService.getMessageHistory(conversationId, page, limit);
  }

  // TODO: This one for test saveMessage() in MessagesService
  @ApiOperation({ summary: 'Create test message' })
  @Post()
  async saveMessage(@Body() dto: CreateMessageDto): Promise<any> {
    return await this.messageService.saveMessage(dto.conversationId, dto.senderId, dto.message);
  }
}
