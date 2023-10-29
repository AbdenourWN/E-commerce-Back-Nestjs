import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type ProductDocument = Products & Document;

@Schema()
export class Products {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' })
  subcategory: mongoose.Types.ObjectId;

  @Prop()
  image: string;

  @Prop()
  promotion: boolean;

  @Prop()
  promotionAmount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
