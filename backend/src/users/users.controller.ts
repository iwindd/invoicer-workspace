import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { TableFetch } from 'src/libs/type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {};

  
  @HttpCode(200)
  @Post()
  create(@Body() payload : CreateUserDto){
    return this.usersService.create(payload)
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() query: TableFetch) {
    return this.usersService.findAll(query);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.id == +id) {
      throw new BadRequestException()
    }

    return this.usersService.remove(+id);
  }
}
