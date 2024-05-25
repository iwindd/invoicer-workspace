import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AuthGuardService } from './auth.decorator';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '365d'
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuardService,
  ],
  exports: [AuthService]
})
export class AuthModule {}
