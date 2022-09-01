import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsServivce } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from './product.entity';
import { UserServivce } from '../User/user.service';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([productEntity]), UserModule],
  controllers: [ProductsController],
  providers: [ProductsServivce],
})
export class ProductsModule {}
