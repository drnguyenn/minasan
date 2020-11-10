import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authenticate one User' })
  async authentication(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return await this.authService.authentication(authDto);
  }
}
