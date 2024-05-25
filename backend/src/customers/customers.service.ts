import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './customers.dto';
import { TableFetch } from 'src/libs/type';
import dayjs = require('dayjs');
import { filter, order, pagination} from 'src/libs/table';

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

  async findAll(table: TableFetch){
    try {
      const filters = filter(table.filter, ['firstname', 'lastname', 'email'], (text) => [
        { createdBy: { ...filter(table.filter, ['firstname', 'lastname']) }, },
      ])
  
      const currentTime = dayjs();
      const data = await this.prisma.$transaction([
        this.prisma.customers.findMany({
          where: {
            isDeleted: false,
            ...(filters)
          },
  
          ...pagination(table.pagination),
          orderBy: order(table.sort),
          select: {
            firstname: true,
            lastname: true,
            id: true,
            email: true,
            joinedAt: true,
  
            createdBy: {
              select: {
                firstname: true,
                lastname: true
              }
            },
            Invoice: {
              where: {
                status: 0,
                start: { lte: currentTime.toDate() },
                end: { gte: currentTime.toDate() },
              },
              select: {
                id: true
              }
            }
          }
        }),
        this.prisma.customers.count({ where: { isDeleted: false } }),
      ])
  
      return {
        data: data[0],
        total: data[1]
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
