import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, identity, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { productEntity } from './product.entity';
import { productInterFace } from './product.interface';

@Injectable()
export class ProductsServivce {
  constructor(
    @InjectRepository(productEntity)
    private readonly productRepository: Repository<productEntity>,
  ) {}

  insertProduct(
    ProductInterFace: productInterFace,
  ): Observable<productInterFace> {
    return from(this.productRepository.save(ProductInterFace));
  }

  getProducts(): Observable<productInterFace[]> {
    return from(this.productRepository.find());
  }

  updateProducts(
    id: string,
    ProductInterFace: productInterFace,
  ): Observable<UpdateResult> {
    return from(this.productRepository.update(id, ProductInterFace));
  }

  deleteProduct(id: string): Observable<DeleteResult> {
    return from(this.productRepository.delete(id));
  }
}
