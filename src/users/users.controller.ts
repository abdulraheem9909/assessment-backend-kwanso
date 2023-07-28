import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { ILogin, IUser } from './interface/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async signUp(@Body() signUpDto: CreateUserDto): Promise<IUser> {
    const { email, password } = signUpDto;
    const user = await this.authService.signUp(email, password);
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ILogin> {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);
    const res = await this.authService.login(user);
    return { access_token: res };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IUser> {
    return this.userService.getUserById(id);
  }
}
