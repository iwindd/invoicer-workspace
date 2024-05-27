import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {};

  @HttpCode(200)
  @Post()
  create(@Request() req, @Body() payload : CreatePaymentDto){
    return this.paymentService.create(payload, req.user.id)
  }
}
