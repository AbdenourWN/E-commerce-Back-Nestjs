import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingAddress, ShippingAddressSchema } from './shipping-address';
import * as mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
  })
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop()
  totalAmount: number;

  @Prop()
  orderDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: ShippingAddressSchema })
  shippingAddress: ShippingAddress;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
