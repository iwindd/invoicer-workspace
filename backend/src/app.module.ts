import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
