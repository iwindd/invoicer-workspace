import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePaymentDto } from './payment.dto';

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

}
