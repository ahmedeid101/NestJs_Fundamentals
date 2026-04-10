import { IsString, IsNumber, IsNotEmpty, Min, Length, IsOptional, Max } from "class-validator";

export class UpdateReviewsDTO{
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating?: number;

    @IsOptional()
    @IsString()
    @Length(2, 150)
    @IsNotEmpty()
    comment?: string;
}