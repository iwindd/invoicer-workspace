import { SetMetadata } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

export const IS_GUEST = 'Guest';
export const Guest = () => SetMetadata(IS_GUEST, true);

export const AuthGuardService = {
  provide: APP_GUARD,
  useClass: AuthGuard,
}