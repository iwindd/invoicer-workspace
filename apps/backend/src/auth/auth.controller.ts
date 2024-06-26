import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Guest } from './auth.decorator';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Guest()
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: any) {
    try {
      const user = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );

      const session = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        permission: user.permission,
      } 
      const jwt = await this.jwtService.signAsync(session);

      res.cookie('jwt', jwt, {httpOnly: true});
      res.status(200).send(session)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Res() response: any) {
    response.clearCookie('jwt');
    response.status(200).send({ message: 'success' })
  }
}
