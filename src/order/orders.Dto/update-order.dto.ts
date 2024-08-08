import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { IsDateString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../models/orders';

export class UpdateOrderDto {
  @IsOptional()
  @ApiProperty({
    type: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        price: Number,
      },
    ],
    isArray: true,
    required: false,
    example: [
      { productId: '60d5ec49f69d0d26e8e8f528', quantity: 1, price: 100 },
    ],
  })
  products?: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsEnum(PaymentStatus)
  @ApiProperty({ required: false })
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsEnum(PaymentMethod)
  @ApiProperty({ required: false })
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({ required: false })
  orderStatus?: OrderStatus;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  orderDate?: Date;

  @IsOptional()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: false })
  userId?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: false })
  shippingAddressId?: mongoose.Schema.Types.ObjectId;
}
