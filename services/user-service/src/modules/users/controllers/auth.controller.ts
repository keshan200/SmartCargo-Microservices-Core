import { Controller, Post, Body, Res, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import type { Request, Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any, @Res({ passthrough: true }) res: Response) {
    const { tokens, user } = await this.authService.login(loginDto.email, loginDto.password);

   
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return { 
      message: 'Login Successful',
      accessToken: tokens.accessToken,
      user 
    };
  }


@Post('refresh-token')
async refreshToken(@Req() req: Request, @Res() res: Response) {
 
  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token missing');
  }

  try {
   
    const tokens = await this.authService.refreshTokens(refreshToken);
  
    return res.send(tokens);
  } catch (e) {
    throw new UnauthorizedException('Invalid refresh token');
  }
}

  


}