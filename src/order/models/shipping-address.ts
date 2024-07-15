import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop()
  country: string;
}

export const ShippingAddressSchema =
  SchemaFactory.createForClass(ShippingAddress);
