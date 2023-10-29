import { ApiProperty } from '@nestjs/swagger';
import { ShippingAddressDto } from './shipping-address.dto';

export class CreateOrderDto {
  @ApiProperty({
    type: Object,
    isArray: true,
    example: [{ productId: '123', quantity: 1, price: 100 }],
  })
  products: [
    {
      productId: string;
      quantity: number;
      price: number;
    },
  ];

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty({ type: ShippingAddressDto })
  shippingAddress: ShippingAddressDto;
}
