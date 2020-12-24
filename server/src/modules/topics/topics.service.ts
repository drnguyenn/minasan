import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Topic } from '../../entities/Topic.entity';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';

@Injectable()
export class TopicsService {
  constructor(@InjectRepository(Topic) private topicRepository: Repository<Topic>) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const { name } = createTopicDto;
    return await this.topicRepository.save({ name });
  }

  async findAll(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async findOne(id: number): Promise<Topic> {
    const Topic = await this.topicRepository.findOne({ id });
    if (!Topic) throw new NotFoundException('Topic not found');
    return Topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const Topic = await this.findOne(id);
    return await this.topicRepository.save({ ...Topic, ...updateTopicDto });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.topicRepository.delete(id);
  }
}
