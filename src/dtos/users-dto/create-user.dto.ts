import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
}