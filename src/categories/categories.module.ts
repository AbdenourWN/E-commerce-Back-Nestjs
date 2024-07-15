import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './models/categories';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { SubcategoryService } from 'src/sub-categories/sub-categories.service';
import { Subcategory, SubcategorySchema } from 'src/sub-categories/models/sub-categories';
import { SubcategoryController } from 'src/sub-categories/sub-categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
    ]),
  ],
  providers: [CategoryService,SubcategoryService],
  controllers: [CategoryController,SubcategoryController],
  exports: [CategoryService,SubcategoryService],
})
export class CategoryModule {}
