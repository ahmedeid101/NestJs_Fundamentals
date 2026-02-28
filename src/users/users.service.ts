import {BadRequestException, ForbiddenException, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dtos/users-dto/register-user.dto";
import { UpdateUserDTO } from "src/dtos/users-dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { LoginUserDTO } from "src/dtos/users-dto/login-user.dto";
import { AccessTokenType, JWTPayloadType } from "src/utils/types";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserType } from "src/utils/enums";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ){}

    //Register New User
    public async regester(registerDTO: CreateUserDTO): Promise<AccessTokenType>{
        const {username, email, password} = registerDTO
        const existUser = await this.userRepository.findOne({where: {email}});
        if(existUser) throw new BadRequestException('User Already Exist');
        const hashedPassword = await this.hashPassword(password);
        let newUser = this.userRepository.create({
            username,
            email,
            password: await bcrypt.hash(registerDTO.password, 10),
        });
        newUser =  await this.userRepository.save(newUser);

        const accessToken = await this.generateJWT({id: newUser.id, userType: newUser.userType})
        return {accessToken};
    }

    //Login User
    public async login(loginDto: LoginUserDTO): Promise<AccessTokenType>{
        const {email, password} = loginDto;
        const user = await this.userRepository.findOne({where: {email}});
        if(!user) throw new BadRequestException("Invalid Email or Password");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) throw new BadRequestException("somthing wrong with password");

        const accessToken = await this.generateJWT({id: user.id, userType: user.userType})
        return {accessToken};

    }
    //Get All User    
    public getAll() {
        return this.userRepository.find();
    }

    //Get Single User
    public async getOne(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) throw new NotFoundException('user not found');
        return user;
    }

    //Get Current User
    public async currentUser(id: number) {
    const user = await this.userRepository.findOne({
        where: { id },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
    }

    //Update User
    public async update(id: number, dto: UpdateUserDTO) {
        const {username, email, password} = dto;
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
        throw new NotFoundException('User not found');
    }
        user.username = dto.username ?? user.username;
        user.email = dto.email ?? user.email;
        if(password){
            user.password = await this.hashPassword(password)
        }
        return this.userRepository.save(user);
    }

    //Delete User
    public async delete(userId: number, payload: JWTPayloadType) {
        const user = await this.currentUser(userId);
        if(user.id === payload.id || payload.userType === UserType.ADMIN){
            await this.userRepository.remove(user);
            return { message: 'user deleted successfully' };
        }
        throw new ForbiddenException("Access Denied: You Are Not Allowed To Delete This Account");
    }

    //Generate Jwt Token
    private generateJWT(payload: JWTPayloadType): Promise<string>{
        return this.jwtService.signAsync(payload);
    }

    //Hashing Password
    private async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
            return bcrypt.hash(password, salt);
    }

}