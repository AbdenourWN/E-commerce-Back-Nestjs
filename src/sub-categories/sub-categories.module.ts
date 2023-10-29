import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, SubcategorySchema } from './models/sub-categories';
import { SubcategoryService } from './sub-categories.service';
import { SubcategoryController } from './sub-categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategory.name, schema: SubcategorySchema },
    ]),
  ],
  providers: [SubcategoryService],
  controllers: [SubcategoryController],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
