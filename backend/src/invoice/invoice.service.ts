import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInvoiceDto } from './invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {};

  async create(payload: CreateInvoiceDto, createdBy: number) {
    try {
      await this.prisma.invoice.create({
        data: {
          ...payload,
          ownerId: Number(payload.ownerId),
          createdById: createdBy,
          status: 0
        }
      })
    } catch (error) {
      console.log(error);
      
      throw new BadRequestException(error)
    }
  }
}
