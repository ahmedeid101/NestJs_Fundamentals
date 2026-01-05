import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewsDTO } from "src/dtos/reviews-dto/create-reviews.dto";
import { UpdateReviewsDTO } from "src/dtos/reviews-dto/update-reviews.dto";
import { UserService } from "src/users/users.service";

type reviewsType = { id: number; rating: number; comment: string };

@Injectable()
export class ReviewsService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService 
    ){}

    private reviews: reviewsType[] = [
        { id: 1, rating: 4, comment: 'good' },
        { id: 2, rating: 4, comment: 'very good' },
        { id: 3, rating: 5, comment: 'good' },
    ];

    //Create New Review
    public create({ rating, comment }: CreateReviewsDTO) {
        const newReviews: reviewsType = {
            id: this.reviews.length + 1,
            rating,
            comment
        };
        this.reviews.push(newReviews);
        return newReviews;
    }

    //Get All Reviews
    public getAll() {
        return this.reviews;
    }

    //Get Single Review
    public getOne(id: string) {
        const review = this.reviews.find((p) => p.id === parseInt(id));
        if (!review) throw new NotFoundException('review not found');
        return review;
    }

    //Update Review
    public update(id: string, updateReviews: UpdateReviewsDTO) {
        const review = this.reviews.find((p) => p.id === parseInt(id));
        if (!review) throw new NotFoundException('review not found');
        console.log(updateReviews);
        return { message: 'review updated successfully' };
    }

    //Delete Review
    public delete(id: string) {
        const review = this.reviews.find((p) => p.id === parseInt(id));
        if (!review) throw new NotFoundException('review not found');
        return { message: 'review deleted successfully' };
    }
}