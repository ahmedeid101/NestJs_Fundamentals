import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,

} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/users-dto/register-user.dto';
import { UpdateUserDTO } from 'src/dtos/users-dto/update-user.dto';
import { UserService } from './users.service';
import { LoginUserDTO } from 'src/dtos/users-dto/login-user.dto';
import { LoggerInterceptor } from 'src/utils/Interceptors/logger.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';
import { UserType } from 'src/utils/enums';
import { Roles } from './decorators/user-role.decorator';

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
  @Roles(UserType.ADMIN)
  @UseGuards(AuthGuard)
  public getAllUsers() {
    return this.userService.getAll();
  }

   @Get('currentUser')
  @UseGuards(AuthGuard)
  public getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    console.log('get current user route handller called');
    return this.userService.currentUser(payload.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  public getSingleUser(@Param('id') id: number) {
    return this.userService.getOne(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  public updateUser(@CurrentUser() payload: JWTPayloadType, @Body() body: UpdateUserDTO) {
    return this.userService.update(payload.id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public deleteUser(@Param('id', ParseIntPipe) id: number, @CurrentUser() payload: JWTPayloadType) {
    return this.userService.delete(id, payload);
  }
}


