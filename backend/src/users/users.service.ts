import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './users.dto';
import { hash } from 'bcrypt';
import { TableFetch } from 'src/libs/type';
import { filter, order, pagination } from 'src/libs/table';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    try {
      await this.prisma.user.create({
        data: {
          ...payload,
          password: await hash(payload.password, 16),
          permission: +payload.permission,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return (this.prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        permission: true,
      },
    }) as unknown) as User | undefined;
  }

    
  async findAll(table: TableFetch) {
    try {
      const data = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where: {
            isDeleted: false,
            ...(filter(table.filter, ['firstname', 'lastname']))
          },
          ...(pagination(table.pagination)),
          orderBy: order(table.sort),
          select: {
            id: true,
            createdAt: true,
            firstname: true,
            lastname: true,
            email: true,
            permission: true,
            Customers: { select: { id: true } },
            Invoice: { select: { id: true } },
          }
        }),
        this.prisma.user.count({ where: { isDeleted: false } }),
      ])

      return {
        data: data[0],
        total: data[1],
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async fineOne(id: number){
    try {
      return await this.prisma.user.findFirst({
        where: { id: id },
        select: {
          firstname: true,
          lastname: true,
          email: true,
          id: true,
          permission: true,
  
          Customers: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              createdAt: true
            },
            where: {
              isDeleted: false
            }
          },
          Invoice: {
            select: {
              id: true,
              status: true,
              start: true,
              end: true,
              note: true,
              createdAt: true
            }
          }
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: number){
    try {
      await this.prisma.user.update({
        where: { id: id, canRemove: true },
        data: { isDeleted: true }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
