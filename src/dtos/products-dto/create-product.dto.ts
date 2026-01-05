import { IsString, IsNumber, IsNotEmpty, Min, Length } from "class-validator";
export class CreateProductDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;
}