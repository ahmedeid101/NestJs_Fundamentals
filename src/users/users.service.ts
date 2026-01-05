import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "src/dtos/users-dto/create-user.dto";
import { UpdateUserDTO } from "src/dtos/users-dto/update-user.dto";
import { ReviewsService } from "src/reviews/reviews.service";

type userType = { id: number, name: string, email: string };

@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => ReviewsService))
        private readonly reviewsService: ReviewsService
    ){}
    private users: userType[] = [
        { id: 1, name: "Ahmed", email: "ahmed@gmail.com" },
        { id: 2, name: "Aly", email: "aly@gmail.com" },
        { id: 3, name: "Ramy", email: "ramy@gmail.com" }
    ];

    //Create New User
    public create({ name, email }: CreateUserDTO) {
        const newUser: userType = {
            id: this.users.length + 1,
            name,
            email
        }
        this.users.push(newUser);
        return newUser;
    }
    //Get All User    
    public getAll() {
        return this.users;
    }

    //Get Single User
    public getOne(id: string) {
        const user = this.users.find((p) => p.id === parseInt(id));
        if (!user) throw new NotFoundException('user not found');
        return user;
    }

    //Update User
    public update(id: string, updateUserDTO: UpdateUserDTO) {
        const review = this.users.find((p) => p.id === parseInt(id));
        if (!review) throw new NotFoundException('user not found');
        console.log(updateUserDTO);
        return { message: 'user updated successfully' };
    }

    //Delete User
    public delete(id: string) {
        const user = this.users.find((p) => p.id === parseInt(id));
        if (!user) throw new NotFoundException('user not found');
        return { message: 'user deleted successfully' };
    }

}