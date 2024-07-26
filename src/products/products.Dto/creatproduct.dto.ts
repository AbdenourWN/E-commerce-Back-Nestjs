import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Price } from '../models/products';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  quantity: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  price: Price[];

  @IsNotEmpty()
  @ApiProperty()
  subcategory: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @IsNotEmpty()
  @ApiProperty()
  promotion: boolean;

  @IsNotEmpty()
  @ApiProperty()
  promotionAmount: string;

  @IsNotEmpty()
  @ApiProperty()
  brand: string;

  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  sizes: string[];

  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  colors: string[];
}
