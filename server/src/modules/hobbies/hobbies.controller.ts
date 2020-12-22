import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Hobby } from '../../entities/Hobby.entity';
import { CreateHobbyDto, UpdateHobbyDto } from './hobbies.dto';
import { HobbiesService } from './hobbies.service';

@ApiTags('Hobbies')
@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
  async create(@Body() createHobbyDto: CreateHobbyDto): Promise<Hobby> {
    return await this.hobbiesService.create(createHobbyDto);
  }

  @Get()
  async findAll(): Promise<Hobby[]> {
    return await this.hobbiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hobby> {
    return await this.hobbiesService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto): Promise<Hobby> {
    return await this.hobbiesService.update(+id, updateHobbyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.hobbiesService.remove(+id);
  }
}
