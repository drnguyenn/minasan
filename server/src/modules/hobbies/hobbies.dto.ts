import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateHobbyDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class UpdateHobbyDto extends PartialType(CreateHobbyDto) {}
