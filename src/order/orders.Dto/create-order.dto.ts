import { ApiProperty } from '@nestjs/swagger';
import { ShippingAddressDto } from './shipping-address.dto';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import * as mongoose from 'mongoose';

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
  products?: {
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
  @IsDate()
  orderDate: Date;

  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: false })
  userId?: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: ShippingAddressDto })
  @IsNotEmpty()
  shippingAddress: ShippingAddressDto;
}
