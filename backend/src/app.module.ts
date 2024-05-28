import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentModule } from './payment/payment.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule, InvoiceModule, PaymentModule, DashboardModule, NoticeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
