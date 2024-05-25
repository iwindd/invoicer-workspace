import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CustomersService, PrismaService],
  controllers: [CustomersController]
})
export class CustomersModule {}
