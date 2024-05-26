import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule, InvoiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
