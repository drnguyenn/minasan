import { Controller, Get, Post, Body, UseGuards, Query, DefaultValuePipe, HttpCode, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './messages.dto';

@ApiBearerAuth()
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}

  @ApiOperation({ summary: 'Retrieve message history between users'})
  @Get(':conversationId')
  @UseGuards(AuthGuard())
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  async getMessageHistory(
    @Param('conversationId') conversationId: number,
    @Query('limit', new DefaultValuePipe(20)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
  ) {
    return this.messageService.getMessageHistory(conversationId, page, limit);
  }

  // TODO: This one for test saveMessage() in MessagesService 
  @ApiOperation({ summary: 'create test message' })
  @Post()
  @HttpCode(200)
  async saveMessage(@Body() dto: CreateMessageDto): Promise<any> {
    await this.messageService.saveMessage(dto.conversationId, dto.senderId, dto.message);
    return { status: 'Successful' };
  }
}
