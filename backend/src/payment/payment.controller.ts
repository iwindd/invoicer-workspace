import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, PatchPaymentDto } from './payment.dto';
import { TableFetch } from 'src/libs/type';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {};

  @HttpCode(200)
  @Post()
  create(@Request() req, @Body() payload : CreatePaymentDto){
    return this.paymentService.create(payload, req.user.id)
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() query: TableFetch) {
    return this.paymentService.findAll(query);
  }

  @Patch(":id")
  patch(@Param("id") id: String, @Body() payload: PatchPaymentDto){
    return this.paymentService.patch(+id, payload)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
