import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';

export class UserResponse {
  @ApiProperty({ type: Number })
  id: number

  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: String })
  email: string


  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
  }
}