import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private configService: ConfigService
  ) {}

 
  async getTokens(userId: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: userId, role },
        { secret: this.configService.get('ACCESS_SECRET_TOKEN'), expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { id: userId },
        { secret: this.configService.get('REFRESH_SECRET_TOKEN'), expiresIn: '7d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }


  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmailForAuth(email); 
    
    if (!user || !(await bcrypt.compare(pass, user.password_hash))) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const tokens = await this.getTokens(user._id.toString(), user.role);
    return { tokens, user: { id: user._id, email: user.email, role: user.role } };
  }





  async refreshTokens(refreshToken: string) {
    try {
     
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_SECRET_TOKEN'),
      });

     
      const user = await this.userRepository.findById(payload.id);
      if (!user) throw new UnauthorizedException();

    
      const accessToken = await this.jwtService.signAsync(
        { id: user._id, email: user.email, role: user.role },
        { expiresIn: '15m' } 
      );

      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}
