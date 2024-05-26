import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.dto';
import { TableFetch } from 'src/libs/type';
import { filter, order, pagination } from 'src/libs/table';

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

  async findAll(table: TableFetch) {
    try {
      const data = await this.prisma.$transaction([
        this.prisma.invoice.findMany({
          where: {
            ownerId: +table.target,
            ...filter(table.filter, ['note']),
          },
          ...(pagination(table.pagination)),
          orderBy: order(table.sort),
          select: {
            id: true,
            status: true,
            note: true,
            items: true,
            start: true,
            end: true,
            createdAt: true,
            image: true,
            ownerId: true,
            createdBy: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        }),
        this.prisma.invoice.count({ where: { ownerId: +table.target } }),
      ]);

      return {
        data: data[0],
        total: data[1],
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, payload: UpdateInvoiceDto){
    try {
      await this.prisma.invoice.update({
        where: {id},
        data: {
          ...payload,
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
