import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/user.service';



@Controller('api/v1/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    return this.usersService.register(createUserDto);
  }
  
}