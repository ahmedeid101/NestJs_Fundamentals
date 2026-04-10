import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/users-dto/register-user.dto';
import { UpdateUserDTO } from 'src/users/users-dto/update-user.dto';
import { UserService } from './users.service';
import { LoginUserDTO } from 'src/users/users-dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';
import { UserType } from 'src/utils/enums';
import { Roles } from './decorators/user-role.decorator';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadDto } from './users-dto/image-upload.dto';
import type { Response } from 'express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  public createNewUser(@Body() body: CreateUserDTO) {
    return this.userService.register(body);
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
  public getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOne(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  public updateUser(
    @CurrentUser() payload: JWTPayloadType,
    @Body() body: UpdateUserDTO,
  ) {
    return this.userService.update(payload.id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.userService.delete(id, payload);
  }

  // POST: ~/api/users/upload-profile-image
  @Post('upload-profile-image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiSecurity('bearer')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ImageUploadDto, description: 'profile image' })
  public uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    // if (!file) throw new BadRequestException('no image provided');
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Invalid file type');
    }
    return this.userService.setProfileImage(payload.id, file.filename);
  }

  // DELETE: ~/api/users/images/remove-profile-image
  @Delete('images/remove-profile-image')
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  public removeProfileImage(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.removeProfileImage(payload.id);
  }

  // GET: ~/api/users/images/:image
  @Get('images/:image')
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  public showProfileImage(@Param('image') image: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'images/users', image);
    return res.sendFile(filePath);
  }
}
