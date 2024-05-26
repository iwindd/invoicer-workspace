import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto, PatchCustomerDto } from './customers.dto';
import { TableFetch } from 'src/libs/type';
import dayjs = require('dayjs');
import { filter, order, pagination } from 'src/libs/table';

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

      return { message: 'success' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(table: TableFetch) {
    try {
      const filters = filter(
        table.filter,
        ['firstname', 'lastname', 'email'],
        text => [
          { createdBy: { ...filter(table.filter, ['firstname', 'lastname']) } },
        ],
      );

      const currentTime = dayjs();
      const data = await this.prisma.$transaction([
        this.prisma.customers.findMany({
          where: {
            isDeleted: false,
            ...filters,
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
                lastname: true,
              },
            },
            Invoice: {
              where: {
                status: 0,
                start: { lte: currentTime.toDate() },
                end: { gte: currentTime.toDate() },
              },
              select: {
                id: true,
              },
            },
          },
        }),
        this.prisma.customers.count({ where: { isDeleted: false } }),
      ]);

      return {
        data: data[0],
        total: data[1],
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.$transaction([
        this.prisma.customers.findFirst({
          where: { id: Number(id) },
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            lineToken: true,
          },
        }),
        this.prisma.invoice.findMany({
          where: {
            ownerId: id,
          },
          select: {
            status: true,
            start: true,
            end: true,
          },
        }),
      ]);

      return {
        customer: data[0],
        invoices: data[1],
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, payload: CreateCustomerDto){
    try {
      await this.prisma.customers.update({
        where: {id},
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email,
          joinedAt: payload.joinedAt,
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async patch(id: number, payload: PatchCustomerDto){
    try {
      await this.prisma.customers.update({
        where: { id },
        data: { lineToken: payload.lineToken }
      })

      return true
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.customers.update({
        where: { id },
        data: { isDeleted: true },
      });

      return true
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
