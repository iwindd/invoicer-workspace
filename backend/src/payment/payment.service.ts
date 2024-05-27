import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePaymentDto, PatchPaymentDto, UpdatePaymentDto } from './payment.dto';
import { TableFetch } from 'src/libs/type';
import { filter, order, pagination } from 'src/libs/table';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {};

  private deactive(){
    return this.prisma.payment.updateMany({
      where: { active: true },
      data: { active: false }
    })
  }

  private async getActive(active: boolean){
    try {
      if (active) {
        await this.deactive()
      }

      return active
    } catch (error) {
      return false
    }
  }

  async create(payload: CreatePaymentDto, id: number){
    try {
      await this.prisma.payment.create({
        data: {
          ...payload,
          active: await this.getActive(payload.active)
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  
  async findAll(table: TableFetch) {
    try {
      const data = await this.prisma.$transaction([
        this.prisma.payment.findMany({
          where: {
            isDeleted: false,
            ...(filter(table.filter, ['title', 'name', 'account']))
          },
  
          ...(pagination(table.pagination)),
          orderBy: order(table.sort),
          select: {
            id: true,
            title: true,
            name: true,
            account: true,
            active: true,
            createdAt: true
          }
        }),
        this.prisma.payment.count({ where: { isDeleted: false } }),
      ])

      return {
        data: data[0],
        total: data[1],
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, payload: UpdatePaymentDto){
    try {
      await this.prisma.payment.update({
        where: {id},
        data: {
          ...payload,
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async patch(id: number, payload: PatchPaymentDto){
    try {
      await this.prisma.payment.update({
        where: {id},
        data: {
          active: await this.getActive(payload.active)
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id : number){
    try {
      await this.prisma.payment.update({ 
        where: { id, active: false }, 
        data: { isDeleted: true } 
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

}
