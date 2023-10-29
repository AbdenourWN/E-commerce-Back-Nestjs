import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
  @Prop()
  name: string;

  @Prop({ type: String, ref: 'Category' })
  categoryId: string;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
