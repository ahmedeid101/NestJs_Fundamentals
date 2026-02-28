import { IsString, IsNumber, IsNotEmpty, Min, Length, IsOptional } from "class-validator";

export class UpdateReviewsDTO{
    @IsOptional()
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    rating?: number;

    @IsOptional()
    @IsString()
    @Length(2, 150)
    @IsNotEmpty()
    comment?: string;
}