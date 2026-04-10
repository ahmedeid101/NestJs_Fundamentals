import { IsString, IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class LoginUserDTO{
    
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string;
}