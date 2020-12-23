import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Topic } from '../../entities/Topic.entity';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';
import { TopicsService } from './topics.service';

@ApiTags('Topics')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.topicsService.create(createTopicDto);
  }

  @Get()
  async findAll(): Promise<Topic[]> {
    return await this.topicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Topic> {
    return await this.topicsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto): Promise<Topic> {
    return await this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.topicsService.remove(+id);
  }
}
