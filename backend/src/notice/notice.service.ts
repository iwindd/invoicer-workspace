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
}
