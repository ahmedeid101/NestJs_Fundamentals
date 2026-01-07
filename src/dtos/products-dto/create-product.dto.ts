import { IsString, IsNumber, IsNotEmpty, Min, Length, IsOptional, MinLength } from "class-validator";
export class CreateProductDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    title: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;
}