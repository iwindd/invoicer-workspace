import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { CreateCustomerDto } from './customers.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @HttpCode(200)
  @Post()
  create(@Request() req, @Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload, req.user.id);
  }
}
