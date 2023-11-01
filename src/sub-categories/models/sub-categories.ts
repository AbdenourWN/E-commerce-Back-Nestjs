import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: mongoose.Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
