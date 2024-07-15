import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, SubcategorySchema } from './models/sub-categories';
import { SubcategoryService } from './sub-categories.service';
import { SubcategoryController } from './sub-categories.controller';
import { Category, CategorySchema } from 'src/categories/models/categories';
import { CategoryService } from 'src/categories/categories.service';
import { CategoryController } from 'src/categories/categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [SubcategoryService,CategoryService],
  controllers: [SubcategoryController,CategoryController],
  exports: [SubcategoryService,CategoryService],
})
export class SubcategoryModule {}
