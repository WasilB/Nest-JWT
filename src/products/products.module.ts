import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsServivce } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from './product.entity';
@Module({
  imports: [TypeOrmModule.forFeature([productEntity])],
  controllers: [ProductsController],
  providers: [ProductsServivce],
})
export class ProductsModule {}
