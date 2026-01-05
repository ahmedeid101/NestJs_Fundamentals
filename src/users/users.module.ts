import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { ReviewsModule } from "src/reviews/reviews.module";

@Module({
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
    imports: [forwardRef(() => ReviewsModule)]
})
export class UsersModule{}