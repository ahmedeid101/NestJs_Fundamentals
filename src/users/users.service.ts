import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dtos/users-dto/register-user.dto";
import { UpdateUserDTO } from "src/dtos/users-dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { LoginUserDTO } from "src/dtos/users-dto/login-user.dto";
import { AccessTokenType, JWTPayloadType } from "src/utils/types";
import { UserType } from "src/utils/enums";
import { AuthProvider } from "./auth.provider";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authProvider: AuthProvider
    ){}

    public async regester(registerDTO: CreateUserDTO): Promise<AccessTokenType>{
        return this.authProvider.regester(registerDTO);
    }

     public async login(loginDto: LoginUserDTO): Promise<AccessTokenType>{
        return this.authProvider.login(loginDto);
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
            user.password = await this.authProvider.hashPassword(password)
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
}