import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { SubcategoryModule } from './sub-categories/sub-categories.module';
import { BrandModule } from './brands/brands.module';
import { OrderModule } from './order/orders.module';
import { ReductionCodeModule } from './reduction-code/reduction-code.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DataBaseUrl, {
      useFindAndModify: false,
    }),
    ProductsModule,
    CategoryModule,
    SubcategoryModule,
    BrandModule,
    OrderModule,
    ReductionCodeModule,
    GalleryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
