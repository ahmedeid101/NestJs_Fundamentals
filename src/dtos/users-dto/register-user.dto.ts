import { IsString, IsNotEmpty, Length, IsEmail, IsStrongPassword } from "class-validator";
import { UserType } from "src/utils/enums";

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    username: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    userType: UserType
}