import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/users-dto/create-user.dto';
import { UpdateUserDTO } from 'src/dtos/users-dto/update-user.dto';
import { UserService } from './users.service';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  public createNewUser(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  public getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  public getSingleUser(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Put(':id')
  public updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
