import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateReviewsDTO } from 'src/dtos/reviews-dto/create-reviews.dto';
import { UpdateReviewsDTO } from 'src/dtos/reviews-dto/update-reviews.dto';
import { ReviewsService } from './reviews.service';
@Controller('api/reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  public createNewReview(@Body() body: CreateReviewsDTO) {
    return this.reviewsService.create(body);
  }

  @Get()
  public getAllReviews() {
    return this.reviewsService.getAll();
  }

  @Get(':id')
  public getSingleReview(@Param('id') id: number) {
    return this.reviewsService.getOne(id);
  }

  @Put(':id')
  public updateReview(@Param('id') id: number, @Body() body: UpdateReviewsDTO) {
    return this.reviewsService.update(id, body);
  }

  @Delete(':id')
  public deleteReview(@Param('id') id: number) {
    return this.reviewsService.delete(id);
  }
}
