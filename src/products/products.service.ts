import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDTO } from "src/dtos/products-dto/create-product.dto";
import { UpdateProductDTO } from "src/dtos/products-dto/update-product.dto";

type productType = { id: number, title: string, price: number };

@Injectable()
export class ProductService {
    private products: productType[] = [
        { id: 1, title: "book", price: 10 },
        { id: 2, title: "pen", price: 5 },
        { id: 3, title: "bag", price: 20 }
    ];

    //Create New Product
    public create({ title, price }: CreateProductDTO) {
        const newProduct: productType = {
            id: this.products.length + 1,
            title,
            price
        }
        this.products.push(newProduct);
        return newProduct;
    }

    //Get All Products
    public getAll() {
        return this.products;
    }

    //Get Single Product
    public getOne(id: number) {
        const product = this.products.find(p => p.id === id);
        if (!product) throw new NotFoundException("product not found");
        return product;
    }

    //Update Product
    public update(id: string, updateProductDTO: UpdateProductDTO) {
        const product = this.products.find(p => p.id === parseInt(id));
        if (!product) throw new NotFoundException("product not found");
        console.log(updateProductDTO);
        return { message: "product updated successfully" };
    }

    //Delete Product
    public delete(id: string) {
        const product = this.products.find(p => p.id === parseInt(id));
        if (!product) throw new NotFoundException("product not found");
        return { message: "product deleted successfully" };
    }
}