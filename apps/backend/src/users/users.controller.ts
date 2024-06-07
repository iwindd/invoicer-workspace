import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PatchUserDto, UpdateUserDto } from './users.dto';
import { TableFetch } from 'src/libs/type';
import { Admin } from 'src/auth/auth.decorator';

@Controller('users')
@Admin()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.fineOne(+id);
  }

  @Put(":id")
  update(@Param('id') id: String, @Body() payload: UpdateUserDto){
    return this.usersService.update(+id, payload);
  }

  @Patch(":id")
  patch(@Param("id") id: String, @Body() payload: PatchUserDto){
    return this.usersService.patch(+id, payload)
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.id == +id) {
      throw new BadRequestException()
    }

    return this.usersService.remove(+id);
  }
}
