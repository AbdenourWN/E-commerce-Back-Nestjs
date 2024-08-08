import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import * as mongoose from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../models/orders';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    type: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        price: Number,
      },
    ],
    isArray: true,
    example: [
      { productId: '60d5ec49f69d0d26e8e8f528', quantity: 1, price: 100 },
    ],
  })
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  orderDate: Date;

  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  shippingAddressId: mongoose.Schema.Types.ObjectId;
}
