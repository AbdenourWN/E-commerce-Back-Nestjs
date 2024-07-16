import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './models/brands';
import { BrandController } from './brands.controller';
import { BrandService } from './brands.service';
import { Products, ProductSchema } from 'src/products/models/products';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: Products.name, schema: ProductSchema },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
