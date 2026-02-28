import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/users-dto/register-user.dto';
import { UpdateUserDTO } from 'src/dtos/users-dto/update-user.dto';
import { UserService } from './users.service';
import { LoginUserDTO } from 'src/dtos/users-dto/login-user.dto';
import { LoggerInterceptor } from 'src/utils/Interceptors/logger.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';

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