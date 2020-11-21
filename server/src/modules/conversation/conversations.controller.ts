import { Controller, Get, Post, Body, UseGuards, HttpCode, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './create-conversation.dto';
import { Conversation } from 'src/entities/Conversation.entity';
import { UserInfo } from 'src/shared/Decorators/user-info.decorator';

@ApiBearerAuth()
@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(public conversationService: ConversationsService) {}

  @ApiOperation({ summary: 'create pair conversation' })
  @Post()
  @UseGuards(AuthGuard())
  async saveMessage(@Body() dto: CreateConversationDto): Promise<any> {
    return this.conversationService.createConversation(dto.user1Id, dto.user2Id);
  }

  @ApiOperation({ summary: 'Retrieve user\'s conversation history'})
  @Get()
  @UseGuards(AuthGuard())
  async getMessageHistory(@UserInfo() user): Promise<Array<Conversation>> {
    return this.conversationService.getConversationHistory(user.id);
  }
}
