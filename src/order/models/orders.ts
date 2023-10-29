import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingAddress, ShippingAddressSchema } from './shipping-address';

@Schema()
export class Order {
  @Prop()
  products: [
    {
      productId: string;
      quantity: number;
      price: number;
    },
  ];

  @Prop()
  totalAmount: number;

  @Prop()
  orderDate: Date;

  @Prop()
  userId?: string;

  @Prop({ type: ShippingAddressSchema })
  shippingAddress: ShippingAddress;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
