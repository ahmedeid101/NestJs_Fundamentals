import { IsString, IsNumber, IsNotEmpty, Min, Length, IsOptional } from "class-validator";
export class CreateProductDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;
}