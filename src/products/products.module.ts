import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [ProductsController],
    providers: [ProductService],
    imports: [
        UsersModule,
        JwtModule,
        TypeOrmModule.forFeature([Product])
    ],
    exports: [ProductService]
})
export class ProductsModule{}