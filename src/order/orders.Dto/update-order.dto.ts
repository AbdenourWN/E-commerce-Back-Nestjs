import { ApiProperty } from '@nestjs/swagger';
import { ShippingAddressDto } from './shipping-address.dto';

export class UpdateOrderDto {
  @ApiProperty({
    type: Object,
    isArray: true,
    required: false,
    example: [{ productId: '123', quantity: 1, price: 100 }],
  })
  products?: [
    {
      productId: string;
      quantity: number;
      price: number;
    },
  ];

  @ApiProperty({ required: false })
  totalAmount?: number;

  @ApiProperty({ required: false })
  orderDate?: Date;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty({ type: ShippingAddressDto, required: false })
  shippingAddress?: ShippingAddressDto;
}
