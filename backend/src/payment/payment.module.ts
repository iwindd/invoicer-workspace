import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService]
})
export class PaymentModule {}
