import { BadRequestException, Injectable } from '@nestjs/common';
import dayjs = require('dayjs');
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NoticeService {
  constructor(private prisma: PrismaService) {};

  async fineOne(id: number){
    try {
      const currentTime = dayjs();
      const data = await this.prisma.$transaction([
        this.prisma.invoice.findMany({
          where: {
            ownerId: id,
            start: {
              lte: currentTime.toDate(), // Less than or equal to current time
            },
            OR: [{ status: 0 }, { status: 2 }],
          },
          select: {
            id: true,
            items: true,
            start: true,
            end: true,
            status: true,
          },
        }),
        this.prisma.payment.findFirst({
          where: {
            active: true,
            isDeleted: false,
          },
        }),
      ]);

      return {
        data: data[0],
        account: data[1]
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async checkOne(id : number){
    try {
      const { data } = await this.fineOne(id);

      return {
        invoice: data.filter(i => (i.status == 0) || (i.status == 2 && dayjs().isAfter(dayjs(i.end).endOf('day')))).length > 0,
        canClose: data.filter((i => (i.status == 0 && dayjs().isBefore(dayjs(i.end).endOf('day'))))).length > 0
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async paid(id:number, imageName: string){
    try {
      await this.prisma.invoice.update({
        where: {id},
        data: {
          image: imageName,
          status: 2
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
