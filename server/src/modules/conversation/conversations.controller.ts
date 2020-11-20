import { Controller, Get, Post, Body, UseGuards, Query, DefaultValuePipe, HttpCode, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './create-conversation.dto';

@ApiBearerAuth()
@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(public conversationService: ConversationsService) {}

  @ApiOperation({ summary: 'create pair conversation' })
  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async saveMessage(@Body() dto: CreateConversationDto): Promise<any> {
    return this.conversationService.createConversation(dto.user1Id, dto.user2Id);
  }
}