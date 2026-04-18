import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from 'src/users/users-dto/register-user.dto';
import { AccessTokenType, JWTPayloadType } from 'src/utils/types';
import { LoginUserDTO } from 'src/users/users-dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { randomBytes } from 'node:crypto';
@Injectable()
export class AuthProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
  ) {}

  //Register New User
  public async register(registerDTO: CreateUserDTO) {
    const { username, email, password } = registerDTO;
    const existUser = await this.userRepository.findOne({ where: { email } });
    if (existUser) throw new BadRequestException('User Already Exist');
    const hashedPassword = await this.hashPassword(password);
    let newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      verificationToken: randomBytes(32).toString('hex'),
    });
    newUser = await this.userRepository.save(newUser);

    const link = `${this.config.get<string>('DOMAIN')}/api/users/verify-email/${newUser.id}/${newUser.verificationToken}`;
    await this.mailService.sendVerifyEmail(email, link);
    // const accessToken = await this.generateJWT({
    //   id: newUser.id,
    //   userType: newUser.userType,
    // });
    return {
      message:
        'Verification Token Is Sent to your Email, please verify your email address',
    };
  }

  //Login User
  public async login(loginDto: LoginUserDTO): Promise<AccessTokenType> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Invalid Email or Password');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestException('somthing wrong with password');

    const accessToken = await this.generateJWT({
      id: user.id,
      userType: user.userType,
    });
    // Send email notification for new login
    this.mailService.sendMail(user.email).catch((err) => {
      console.error('Email failed:', err);
    });
    //await this.mailService.sendMail(user.email);
    return { accessToken };
  }

  //Generate Jwt Token
  private generateJWT(payload: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  //Hashing Password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
