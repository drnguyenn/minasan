import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  user1Id: number;
  
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  user2Id: number;
}
