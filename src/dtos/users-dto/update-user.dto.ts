import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsStrongPassword,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UserType } from 'src/utils/enums';
export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  @IsOptional()
  userType: UserType;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isAccountVerified: boolean;
}
