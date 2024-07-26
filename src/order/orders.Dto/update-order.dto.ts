import { ApiProperty } from '@nestjs/swagger';
import { ShippingAddressDto } from './shipping-address.dto';
import * as mongoose from 'mongoose';
import { IsDateString, IsOptional } from 'class-validator';

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
  totalAmount?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  orderDate?: Date;

  @IsOptional()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: false })
  userId?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @ApiProperty({ type: ShippingAddressDto, required: false })
  shippingAddress?: ShippingAddressDto;
}
