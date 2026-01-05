import { IsString, IsEmail, IsNotEmpty, Min, Length } from "class-validator";
export class UpdateUserDTO{
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    name?: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email?: string;
}

