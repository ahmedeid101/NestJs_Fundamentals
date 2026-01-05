import { IsString, IsNumber, IsNotEmpty, Min, Length } from "class-validator";

export class UpdateReviewsDTO{
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    rating?: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 150)
    comment?: string;
}