import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { CreateInvoiceDto } from './invoice.dto';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {};

  @HttpCode(200)
  @Post()
  create(@Request() req, @Body() payload: CreateInvoiceDto) {
    return this.invoiceService.create(payload, req.user.id);
  }

}
