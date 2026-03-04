import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewsDTO } from "src/dtos/reviews-dto/create-reviews.dto";
import { UpdateReviewsDTO } from "src/dtos/reviews-dto/update-reviews.dto";
import { Review } from "./review.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/users/users.service";
import { ProductService } from "src/products/products.service";
import { JWTPayloadType } from "src/utils/types";
import { UserType } from "src/utils/enums";


@Injectable()
export class ReviewsService {
    constructor(
         @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private readonly usersService: UserService,
        private readonly productService: ProductService
        ){}

    //Create New Review
    public async create(prodyctId: number, userId: number, dto: CreateReviewsDTO) {
        const product = await this.productService.getOne(prodyctId);
        const user = await this.usersService.getOne(userId);
        const newReviews = this.reviewRepository.create({...dto, product, user});
        return this.reviewRepository.save(newReviews);
    }

    //Get All Reviews
    public getAll() {
        return this.reviewRepository.find({order: {createdAt: 'DESC'}});
    }

    //Get Single Review
    public async getOne(id: number) {
        const review = await this.reviewRepository.findOne({where: {id}});
        if (!review) throw new NotFoundException('review not found');
        return review;
    }

    //Update Review
    public async update(reviewId: number, userId: number, dto: UpdateReviewsDTO) {
        const review = await this.getReviewById(reviewId);
        if(review.user.id !== userId) 
            throw new ForbiddenException("Access Denied, You Are Not Allowed To Update This Review");
        const user = await this.usersService.getOne(userId);
        review.rating = dto.rating ?? review.rating;
        review.comment = dto.comment ?? review?.comment;
        return this.reviewRepository.save(review);
    }

    //Delete Review
    public async delete(id: number, payload: JWTPayloadType) {
        const review = await this.getReviewById(id);
        if(review.user.id === payload.id || payload.userType === UserType.ADMIN){
            await this.reviewRepository.remove(review)
            return { message: 'review deleted successfully' };
        }
        throw new ForbiddenException("Access Denied, You Are Not Allowed To Delete This Review")
    }

    private async getReviewById(id: number){
        const review = await this.reviewRepository.findOne({where: {id}});
        if(!review) throw new NotFoundException("Review Not Found");
        return review;
    }
}