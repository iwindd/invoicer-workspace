import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {};

  
  @HttpCode(200)
  @Post()
  create(@Body() payload : CreateUserDto){
    return this.usersService.create(payload)
  }

}
