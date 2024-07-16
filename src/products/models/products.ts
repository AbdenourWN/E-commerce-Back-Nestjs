import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type ProductDocument = Products & Document;

@Schema({ timestamps: true })
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

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: mongoose.Types.ObjectId;

  @Prop([String])
  sizes: string[];

  @Prop([String])
  colors: string[];

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
