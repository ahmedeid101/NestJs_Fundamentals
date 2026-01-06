import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductsModule, 
    ReviewsModule, 
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'nestjs-app-db',
      username: 'postgres',
      password: "Admin101",
      port: 5432,
      host: 'localhost',
      synchronize: true, //for development only
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    })
  ]
  // exports: [],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
