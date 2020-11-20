import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  conversationId: number;
  
  @ApiProperty()
  @IsDefined()
  @IsString()
  message: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  senderId: number;
}
