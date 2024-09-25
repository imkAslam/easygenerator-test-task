import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from '../auth/dto/registration.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-user')
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get('/users')
  findAll() {
    return this.usersService.findAll();
  }
}
