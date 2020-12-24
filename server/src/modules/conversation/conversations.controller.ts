import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Conversation } from '../../entities/Conversation.entity';
import { User } from '../../entities/User.entity';
import { UserInfo } from '../../shared/Decorators/user-info.decorator';
import { CreateConversationDto } from './conversation.dto';
import { ConversationsService } from './conversations.service';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(public conversationService: ConversationsService) {}

  @ApiOperation({ summary: 'Retrieve many conversations' })
  @Get()
  async getConversations(@UserInfo() user: User): Promise<Array<Conversation>> {
    return this.conversationService.getConversations(user.id);
  }

  @ApiOperation({ summary: 'Retrieve one conversation with messages' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get(':id')
  async getConversation(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', new DefaultValuePipe(1000)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @UserInfo() user: User
  ): Promise<Conversation> {
    return this.conversationService.getConversation(id, user.id, limit, page);
  }

  @ApiOperation({ summary: 'Create conversation' })
  @Post()
  async createConversation(@UserInfo() user: User, @Body() dto: CreateConversationDto): Promise<Conversation> {
    return this.conversationService.createConversation(user.id, dto.userId);
  }
}
