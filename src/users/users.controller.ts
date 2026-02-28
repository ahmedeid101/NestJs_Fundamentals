import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
<<<<<<< HEAD
  Req,
  UseGuards,
  UseInterceptors,
=======
>>>>>>> 7865a3cbcc341e810594fa6b0eea76a0abb6e635
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/users-dto/register-user.dto';
import { UpdateUserDTO } from 'src/dtos/users-dto/update-user.dto';
import { UserService } from './users.service';
import { LoginUserDTO } from 'src/dtos/users-dto/login-user.dto';
<<<<<<< HEAD
import { LoggerInterceptor } from 'src/utils/Interceptors/logger.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';
=======
>>>>>>> 7865a3cbcc341e810594fa6b0eea76a0abb6e635

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

<<<<<<< HEAD
   @Get('currentUser')
  @UseGuards(AuthGuard)
  //@UseInterceptors(LoggerInterceptor)
  public getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.currentUser(payload.id);
  }

  @Get(':id')
  @UseInterceptors(LoggerInterceptor)
  public getSingleUser(@Param('id') id: number) {
    console.log("Get Single User Call");
=======
  @Get(':id')
  public getSingleUser(@Param('id') id: number) {
>>>>>>> 7865a3cbcc341e810594fa6b0eea76a0abb6e635
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