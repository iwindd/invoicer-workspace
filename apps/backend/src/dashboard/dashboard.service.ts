import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getData(){
    try {
      return await this.prisma.invoice.findMany({
        include: {
          owner: {
            select: {
              firstname: true,
              lastname: true
            }
          }
        }
      });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}

