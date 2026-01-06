import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewsDTO } from "src/dtos/reviews-dto/create-reviews.dto";
import { UpdateReviewsDTO } from "src/dtos/reviews-dto/update-reviews.dto";
import { UserService } from "src/users/users.service";
import { Review } from "./review.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class ReviewsService {
    constructor(
         @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
        ){}

    //Create New Review
    public create(dto: CreateReviewsDTO) {
        const newReviews = this.reviewRepository.create(dto);
        return this.reviewRepository.save(newReviews);
    }

    //Get All Reviews
    public getAll() {
        return this.reviewRepository.find();
    }

    //Get Single Review
    public async getOne(id: number) {
        const review = await this.reviewRepository.findOne({where: {id}});
        if (!review) throw new NotFoundException('review not found');
        return review;
    }

    //Update Review
    public async update(id: number, dto: UpdateReviewsDTO) {
        const review = await this.getOne(id);
        review.rating = dto.rating ?? review.rating;
        review.comment = dto.comment ?? review?.comment;
        return this.reviewRepository.save(review);
    }

    //Delete Review
    public async delete(id: number) {
        const review = await this.getOne(id);
        await this.reviewRepository.remove(review)
        return { message: 'review deleted successfully' };
    }
}