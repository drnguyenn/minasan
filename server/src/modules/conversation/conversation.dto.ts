import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  userId: number;
}
