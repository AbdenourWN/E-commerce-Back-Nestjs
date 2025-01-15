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
      },
    ],
    isArray: true,
    example: [
      { productId: '60d5ec49f69d0d26e8e8f528'},
    ],
  })
  products: {
    productId: mongoose.Schema.Types.ObjectId;
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

  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  shippingAddressId: mongoose.Schema.Types.ObjectId;
}
