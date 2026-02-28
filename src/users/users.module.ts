import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { StringValue } from 'ms';

@Module({
    controllers: [UsersController],
    providers: [UserService],
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
    }),
    ]
    // imports: [TypeOrmModule.forFeature([User])]
})
export class UsersModule{}