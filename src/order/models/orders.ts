import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
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
  paymentStatus: PaymentStatus;

  @Prop()
  paymentMethod: PaymentMethod;

  @Prop()
  orderStatus: OrderStatus;

  @Prop()
  orderDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress', required: true })
  shippingAddressId: mongoose.Schema.Types.ObjectId;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
