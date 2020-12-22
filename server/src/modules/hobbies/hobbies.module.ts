import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hobby } from '../../entities/Hobby.entity';
import { HobbiesController } from './hobbies.controller';
import { HobbiesService } from './hobbies.service';

@Module({
  controllers: [HobbiesController],
  imports: [TypeOrmModule.forFeature([Hobby])],
  providers: [HobbiesService]
})
export class HobbiesModule {}
