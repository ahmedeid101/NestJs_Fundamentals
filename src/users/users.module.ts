import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
<<<<<<< HEAD
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { StringValue } from 'ms';
=======
>>>>>>> 7865a3cbcc341e810594fa6b0eea76a0abb6e635

@Module({
    controllers: [UsersController],
    providers: [UserService],
<<<<<<< HEAD
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
            return {
                global: true,
                secret: config.getOrThrow<string>("JWT_SECRET_KEY"),
                signOptions: {expiresIn: config.getOrThrow<StringValue>("JWT_EXPIRES_IN")}
            }
        }
    })
    ]
=======
    imports: [TypeOrmModule.forFeature([User])]
>>>>>>> 7865a3cbcc341e810594fa6b0eea76a0abb6e635
})
export class UsersModule{}