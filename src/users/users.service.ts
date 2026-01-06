import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dtos/users-dto/create-user.dto";
import { UpdateUserDTO } from "src/dtos/users-dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
   

    //Create New User
    public create(dto: CreateUserDTO) {
        const newUser = this.userRepository.create(dto);
        return this.userRepository.save(newUser);
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
        user.name = dto.name ?? user.name;
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