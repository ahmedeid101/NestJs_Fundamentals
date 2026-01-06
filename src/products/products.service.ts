import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDTO } from "src/dtos/products-dto/create-product.dto";
import { UpdateProductDTO } from "src/dtos/products-dto/update-product.dto";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}

    //Create New Product
    public create( dto: CreateProductDTO) {
        const newProduct = this.productRepository.create(dto);
        return this.productRepository.save(newProduct);
    }

    //Get All Products
    public getAll() {
        return this.productRepository.find();
    }

    //Get Single Product
    public async getOne(id: number) {
        const product = await this.productRepository.findOne({where: {id}});
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