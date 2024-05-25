import {
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
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Guest()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
