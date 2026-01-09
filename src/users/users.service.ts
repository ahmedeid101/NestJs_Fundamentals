import {BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dtos/users-dto/register-user.dto";
import { UpdateUserDTO } from "src/dtos/users-dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { LoginUserDTO } from "src/dtos/users-dto/login-user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    //Register New User
    public async regester(registerDTO: CreateUserDTO){
        const {username, email, password} = registerDTO
        const existUser = await this.userRepository.findOne({where: {email}});
        if(existUser) throw new BadRequestException('User Already Exist');
        let newUser = this.userRepository.create({
            username,
            email,
            password: await bcrypt.hash(registerDTO.password, 10),
        });
        newUser =  await this.userRepository.save(newUser);
        return newUser;
    }

    //Login User
    public async login(loginDto: LoginUserDTO){
        const {email, password} = loginDto;
        const user = await this.userRepository.findOne({where: {email}});
        if(!user) throw new BadRequestException("Invalid Email or Password");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) throw new BadRequestException("somthing wrong with password");

        return user;
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

    //Update User
    public async update(id: number, dto: UpdateUserDTO) {
        const user = await this.getOne(id);
        user.username = dto.username ?? user.username;
        user.email = dto.email ?? user.email;
        return this.userRepository.save(user);
    }

    //Delete User
    public async delete(id: number) {
        const user = await this.getOne(id);
        await this.userRepository.remove(user);
        return { message: 'user deleted successfully' };
    }

}