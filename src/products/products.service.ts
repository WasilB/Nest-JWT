import {
  Inject,
  Injectable,
  Next,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { from, identity, Observable } from 'rxjs';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Response, Request, NextFunction } from 'express';
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
    return from(this.productRepository.find({}));
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

  // async validateUser(@Req() request: Request, @Next() next) {
  //   const cookie = request.cookies['jwt'];

  //   const data = await this.jwtService.verifyAsync(cookie);
  //   if (!data) {
  //     throw new UnauthorizedException();
  //   }
  // }
}
