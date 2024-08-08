import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateShippingAddressDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  address1: string;

  @IsOptional()
  @ApiProperty({ required: false })
  address2?: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  state: string;

  @IsNotEmpty()
  @ApiProperty()
  zipCode: string;

  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  country: string;
}
