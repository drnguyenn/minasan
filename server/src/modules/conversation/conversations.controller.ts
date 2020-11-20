import { Controller, Get, Post, Body, UseGuards, HttpCode, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './create-conversation.dto';
import { Conversation } from 'src/entities/Conversation.entity';

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

  
  @ApiOperation({ summary: 'Retrieve user\'s conversation history'})
  @Get()
  @UseGuards(AuthGuard())
  async getMessageHistory (@Request() req): Promise<Array<Conversation>> {
    if (!req.user) {
      throw new Error('jwt_does_not_work');
    }
    return this.conversationService.getConversationHistory(req.user.id);
  }
}