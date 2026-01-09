import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/users-dto/register-user.dto';
import { UpdateUserDTO } from 'src/dtos/users-dto/update-user.dto';
import { UserService } from './users.service';
import { LoginUserDTO } from 'src/dtos/users-dto/login-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('auth/register')
  public createNewUser(@Body() body: CreateUserDTO) {
    return this.userService.regester(body);
  }

  @Post('auth/login')
  public loginUser(@Body() body: LoginUserDTO) {
    return this.userService.login(body);
  }

  @Get()
  public getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  public getSingleUser(@Param('id') id: number) {
    return this.userService.getOne(id);
  }

  @Put(':id')
  public updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}