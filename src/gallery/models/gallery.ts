import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  image: string;
}

export type GalleryDocument = Gallery & Document;

export const GallerySchema = SchemaFactory.createForClass(Gallery);
