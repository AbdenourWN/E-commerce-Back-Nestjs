import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  subcategory: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @IsNotEmpty()
  @ApiProperty()
  promotion: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  promotionAmount: number;

  @IsNotEmpty()
  @ApiProperty()
  brand: string;
}
