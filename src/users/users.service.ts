import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { IUser } from './interface/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: userDto });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: string): Promise<IUser> {
    const res = await this.prisma.user.findUnique({ where: { id } });
    const { password, ...rest } = res;
    return rest;
  }
  async getUserByBearerToken(token: string): Promise<User> {
    const { email } = this.jwtService.verify(token);

    return await this.findByEmail(email);
  }
}
