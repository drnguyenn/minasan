import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak'
  })
  password: string;
}

export class UpdateUserDto extends PartialType(PickType(CreateUserDto, ['name', 'password'] as const)) {
  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @Transform((value: string) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
  @IsNumber({}, { each: true })
  hobbyIds: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @Transform((value: string) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
  @IsNumber({}, { each: true })
  topicIds: number[];

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  avatar: any;
}
