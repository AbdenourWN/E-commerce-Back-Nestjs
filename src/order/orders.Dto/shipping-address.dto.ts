import { ApiProperty } from '@nestjs/swagger';

export class ShippingAddressDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  address1: string;

  @ApiProperty({ required: false })
  address2?: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  country: string;
}
