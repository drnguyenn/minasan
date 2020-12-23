import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
