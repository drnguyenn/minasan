import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Topic } from '../../entities/Topic.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  controllers: [TopicsController],
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicsService]
})
export class TopicsModule {}
