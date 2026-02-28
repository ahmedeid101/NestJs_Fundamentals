import { IsString, IsNumber, IsNotEmpty, Length, IsOptional, Min, MinLength } from "class-validator";

export class UpdateProductDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @IsOptional()
    price?: number;
}