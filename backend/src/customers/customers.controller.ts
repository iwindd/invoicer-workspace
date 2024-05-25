import { Body, Controller, Get, HttpCode, Post, Query, Request } from '@nestjs/common';
import { CreateCustomerDto } from './customers.dto';
import { CustomersService } from './customers.service';
import { TableFetch } from 'src/libs/type';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @HttpCode(200)
  @Post()
  create(@Request() req, @Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload, req.user.id);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() query: TableFetch) {
    return this.customersService.findAll(query);
  }
}
