import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),

  
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: Number(config.get('DB_PORT')),
          username: config.get('DB_USERNAME'),
          password: String(config.get('DB_PASSWORD')),
          database: config.get('DB_DATABASE'),
          synchronize: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),

    ProductsModule, 
    ReviewsModule, 
    UsersModule,
  ]
})
export class AppModule {}

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV }`
//     }), 

//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         type: 'postgres',
//         host: 'localhost',
//         port: Number(config.get('DB_PORT')),
//         username: config.get('DB_USERNAME'),
//         password: String(config.get('DB_PASSWORD')),
//         database: config.get('DB_DATABASE'),
//         synchronize: true,
//         entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       }),
//     }),
    
//     ProductsModule, 
//     ReviewsModule, 
//     UsersModule,
//   ]
//   // exports: [],
//   // controllers: [],
//   // providers: [],
// })

// export class AppModule {}
