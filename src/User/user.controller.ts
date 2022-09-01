import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserServivce } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private UserService: UserServivce,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.UserService.createUser({
      email,
      password: hashedPassword,
      name,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.UserService.findOne({ email });

    if (!user) throw new BadRequestException('Invalid credentials!');

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Invalid credentials!');

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'Success',
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.UserService.findOne({ id: data['id'] });

      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      Message: 'Cookie Cleared',
    };
  }
}
