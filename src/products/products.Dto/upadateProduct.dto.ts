import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Price } from '../models/products';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsOptional()
  @ApiProperty({ required: false })
  price: Price[];

  @IsOptional()
  @ApiProperty({ required: false, default: '0' })
  quantity: string;

  @IsOptional()
  @ApiProperty({ required: false })
  category: string;

  @IsOptional()
  @ApiProperty({ required: false })
  subcategory: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

  @IsOptional()
  @ApiProperty({ required: false, default: false })
  promotion: boolean;

  @IsOptional()
  @ApiProperty({ required: false, default: '0' })
  promotionAmount: string;

  @IsOptional()
  @ApiProperty({ required: false })
  brand: string;

  @IsOptional()
  @ApiProperty({ required: false, type: [String] })
  sizes: string[];

  @IsOptional()
  @ApiProperty({ required: false, type: [String] })
  colors: string[];
}
