import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { ReviewsModule } from "src/reviews/reviews.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
    imports: [forwardRef(() => ReviewsModule), TypeOrmModule.forFeature([User])]
})
export class UsersModule{}