import { IsString, IsNumber, IsNotEmpty, Length, IsOptional, Min } from "class-validator";

export class UpdateProductDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    @IsOptional()
    title?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @IsOptional()
    price?: number;
}