import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Request } from '@nestjs/common';
import { CreateCustomerDto, PatchCustomerDto } from './customers.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Put(":id")
  update(@Param('id') id: String, @Body() payload: CreateCustomerDto){
    return this.customersService.update(+id, payload);
  }

  @Patch(":id")
  patch(@Param('id') id: string, @Body() payload: PatchCustomerDto){
    return this.customersService.patch(+id, payload)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
