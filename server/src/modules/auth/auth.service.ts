import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../../entities/User.entity';
import { AuthDto } from './auth.dto';
import { JwtPayload } from './jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

  async authentication(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { email, password } = authDto;

    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    if (!compareSync(password, user.hashedPassword)) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { name: user.name, email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token.split(' ')[1]);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
