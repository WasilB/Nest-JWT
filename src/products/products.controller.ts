import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { from, Observable } from 'rxjs';

import { DeleteResult, UpdateResult } from 'typeorm';
import { productInterFace } from './product.interface';
import { ProductsServivce } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsServivce) {}
  @Post()
  addProduct(
    @Body() ProductInterFace: productInterFace,
  ): Observable<productInterFace> {
    return from(this.productsService.insertProduct(ProductInterFace));
  }

  @Get()
  getAllProducts(): Observable<productInterFace[]> {
    return from(this.productsService.getProducts());
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() ProductInterFace: productInterFace,
  ): Observable<UpdateResult> {
    return from(this.productsService.updateProducts(id, ProductInterFace));
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Observable<DeleteResult> {
    return from(this.productsService.deleteProduct(id));
  }
}
