import { IsString, IsEmail, IsNotEmpty, Min, Length, IsOptional } from "class-validator";
export class UpdateUserDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email?: string;
}

