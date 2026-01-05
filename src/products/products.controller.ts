import { Body, Controller, Get, Param, Post, NotFoundException, Put, Delete, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { CreateProductDTO } from "src/dtos/products-dto/create-product.dto";
import { UpdateProductDTO } from "src/dtos/products-dto/update-product.dto";
import { ProductService } from "./products.service";
import { UserService } from "src/users/users.service";

@Controller("api/products")
export class ProductsController{
    constructor(private readonly productService: ProductService, private readonly userService: UserService){};

    @Post()
    public createNewProduct(@Body() body: CreateProductDTO){
        return this.productService.create(body);
    }

    @Get()
    public getAllProducts(){
        const users = this.userService.getAll()
        const products= this.productService.getAll();
        return {products, users};
    }

    @Get(":id")
    public getSingleProduct(@Param("id", ParseIntPipe) id: number){
        return this.productService.getOne(id);
    }

    @Put(":id")
    public updateProduct(@Param("id") id:string, @Body() body: UpdateProductDTO){
        return this.productService.update(id, body);
    }
    
     @Delete(":id")
    public deleteProduct(@Param("id") id:string){
        return this.productService.delete(id);
    }    

}