import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateReviewsDTO } from 'src/dtos/reviews-dto/create-reviews.dto';
import { UpdateReviewsDTO } from 'src/dtos/reviews-dto/update-reviews.dto';
import { ReviewsService } from './reviews.service';
import { AuthRolesGuard } from 'src/users/guards/auth-role.guard';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { JWTPayloadType } from "src/utils/types";

@Controller('api/reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post(':productId')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  public async createNewReview(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() payload: JWTPayloadType,
    @Body() body: CreateReviewsDTO

  ) {
    const result = await this.reviewsService.create(productId, payload.id, body);
    return {
      id: result.id,
      rating: result.rating,
      comment: result.comment,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }

  @Get()
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public getAllReviews() {
    return this.reviewsService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  public getSingleReview(@Param('id') id: number) {
    return this.reviewsService.getOne(id);
  }

  @Put(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  public updateReview(
    @Param('id') id: number, 
    @CurrentUser() payload: JWTPayloadType,
    @Body() body: UpdateReviewsDTO
  ) {
    return this.reviewsService.update(id, payload.id, body);
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  public deleteReview(@Param('id') id: number, @CurrentUser() payload: JWTPayloadType,) {
    return this.reviewsService.delete(id, payload);
  }
}
