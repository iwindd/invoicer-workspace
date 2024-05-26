import { Body, Controller, Get, HttpCode, Post, Query, Request } from '@nestjs/common';
import { CreateInvoiceDto } from './invoice.dto';
import { InvoiceService } from './invoice.service';
import { TableFetch } from 'src/libs/type';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {};

  @HttpCode(200)
  @Post()
  create(@Request() req, @Body() payload: CreateInvoiceDto) {
    return this.invoiceService.create(payload, req.user.id);
  }
  
  @HttpCode(200)
  @Get()
  findAll(@Query() query: TableFetch) {
    return this.invoiceService.findAll(query);
  }
}
