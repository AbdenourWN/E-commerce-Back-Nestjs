import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class ShippingAddress {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address1: string;

  @Prop({ required: false })
  address2?: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  country: string;
}

export const ShippingAddressSchema =
  SchemaFactory.createForClass(ShippingAddress);
