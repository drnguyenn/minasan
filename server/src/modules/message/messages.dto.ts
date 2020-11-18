import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  message: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  senderId: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  recipientId: number;
}

