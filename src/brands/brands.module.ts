import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './models/brands';
import { BrandController } from './brands.controller';
import { BrandService } from './brands.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
