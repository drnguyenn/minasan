import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

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
