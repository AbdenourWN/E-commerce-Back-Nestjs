import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class UpdateShippingAddressDto {
  @IsOptional()
  @ApiProperty({ required: false })
  firstName?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  lastName?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  address1?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  address2?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  state?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  zipCode?: string;

  @IsOptional()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: false })
  userId?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @ApiProperty({ required: false })
  country?: string;
}
