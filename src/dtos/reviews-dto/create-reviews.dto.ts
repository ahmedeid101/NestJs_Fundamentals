import { IsString, IsNumber, IsNotEmpty, Min, Length, Max,  } from "class-validator";
export class CreateReviewsDTO{
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 150)
    comment: string;
}