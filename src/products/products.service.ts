import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDTO } from "src/products/products-dto/create-product.dto";
import { UpdateProductDTO } from "src/products/products-dto/update-product.dto";
import { Between, ILike, Like, Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/users/users.service";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly userService: UserService
    ){}

    //Create New Product
    public async create( dto: CreateProductDTO, userId: number) {
        const user = await this.userService.getOne(userId);
        const newProduct = this.productRepository.create({
            ...dto,
            title: dto.title.toLocaleLowerCase(),
            user
        });
        return this.productRepository.save(newProduct);
    }

    //Get All Products
    public getAll(title?: string, minPrice?: number, maxPrice?: number) {
        const filters = {
            ...(title ? {title: ILike(`%${title}%`)} : {} ),
            ...(minPrice !== undefined && maxPrice !== undefined
                ? {price: Between(minPrice, maxPrice)} : {}
            )
        }
        return this.productRepository.find({where: filters});
    }
        

    //Get Single Product
    public async getOne(id: number) {
        const product = await this.productRepository.findOne({where: {id}, relations: {user: true, reviews: true}});
        if (!product) throw new NotFoundException("product not found");
        return product;
    }

    //Update Product
    public async update(id: number, dto: UpdateProductDTO) {
        const product = await this.getOne(id);
        product.title = dto.title ?? product.title;
        product.description = dto.description ?? product.description;
        product.price = dto.price ?? product.price;
        return this.productRepository.save(product);
    }

    //Delete Product
    public async delete(id: number) {
        const product = await this.getOne(id);
        await this.productRepository.remove(product);
        return { message: "product deleted successfully" };
    }
}