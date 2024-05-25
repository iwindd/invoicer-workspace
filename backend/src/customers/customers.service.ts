import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateCustomerDto, createdBy: number) {
    try {
      const customer = await this.prisma.customers.create({
        data: {
          ...payload,
          createdById: createdBy,
        },
      });

      return {message: "success"}
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
