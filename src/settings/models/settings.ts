import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({ required: true })
  facebookUrl: string;

  @Prop({ required: true })
  instagramUrl: string;

  @Prop({ required: true })
  tiktokUrl: string;

  @Prop()
  websiteLogo: string;

  @Prop({ required: true })
  websiteName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  deliveryPrice: number;

  @Prop({ required: true })
  freeDeliveryThreshold: number;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
