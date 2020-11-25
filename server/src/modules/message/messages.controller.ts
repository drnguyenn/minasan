import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateMessageDto } from './messages.dto';
import { MessagesService } from './messages.service';

@ApiBearerAuth()
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}

  @ApiOperation({ summary: 'Create message' })
  @Post()
  async saveMessage(@Body() dto: CreateMessageDto): Promise<any> {
    return await this.messageService.saveMessage(dto.conversationId, dto.message, dto.senderId);
  }
}
