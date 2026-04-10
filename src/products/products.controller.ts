import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  Put,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from 'src/products/products-dto/create-product.dto';
import { UpdateProductDTO } from 'src/products/products-dto/update-product.dto';
import { ProductService } from './products.service';
import { AuthRolesGuard } from 'src/users/guards/auth-role.guard';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public createNewProduct(
    @Body() body: CreateProductDTO,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.productService.create(body, payload.id);
  }

  @Get()
  public getAllProducts(
    @Query('title') title?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.productService.getAll(
      title,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
    );
  }

  @Get(':id')
  public getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOne(id);
  }

  @Put(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public updateProduct(
    @Param('id') id: number,
    @Body() body: UpdateProductDTO,
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
