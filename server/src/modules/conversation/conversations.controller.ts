import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Conversation } from '../../entities/Conversation.entity';
import { User } from '../../entities/User.entity';
import { UserInfo } from '../../shared/Decorators/user-info.decorator';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './create-conversation.dto';

@ApiBearerAuth()
@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(public conversationService: ConversationsService) {}

  @ApiOperation({ summary: 'Create pair conversation' })
  @Post()
  @UseGuards(AuthGuard())
  async saveMessage(@Body() dto: CreateConversationDto): Promise<any> {
    return this.conversationService.createConversation(dto.user1Id, dto.user2Id);
  }

  @ApiOperation({ summary: "Retrieve user's conversation history" })
  @Get()
  @UseGuards(AuthGuard())
  async getMessageHistory(@UserInfo() user: User): Promise<Array<Conversation>> {
    return this.conversationService.getConversationHistory(user.id);
  }
}
