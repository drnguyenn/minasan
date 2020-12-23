import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hobby } from '../../entities/Hobby.entity';
import { CreateHobbyDto, UpdateHobbyDto } from './hobbies.dto';

@Injectable()
export class HobbiesService {
  constructor(@InjectRepository(Hobby) private hobbyRepository: Repository<Hobby>) {}

  async create(createHobbyDto: CreateHobbyDto): Promise<Hobby> {
    const { name } = createHobbyDto;
    return await this.hobbyRepository.save({ name });
  }

  async findAll(): Promise<Hobby[]> {
    return await this.hobbyRepository.find();
  }

  async findOne(id: number): Promise<Hobby> {
    const hobby = await this.hobbyRepository.findOne({ id });
    if (!hobby) throw new NotFoundException('Hobby not found');
    return hobby;
  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto): Promise<Hobby> {
    const hobby = await this.findOne(id);
    return await this.hobbyRepository.save({ ...hobby, ...updateHobbyDto });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.hobbyRepository.delete(id);
  }
}
