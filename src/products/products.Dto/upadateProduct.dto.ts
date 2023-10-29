import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  quantity: number;

  @IsOptional()
  @ApiProperty({ required: false })
  category: string;

  @IsOptional()
  @ApiProperty({ required: false })
  subcategory: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

  @IsOptional()
  @ApiProperty({ required: false })
  promotion: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  promotionAmount: number;

  @IsOptional()
  @ApiProperty({ required: false })
  brand: string;
}
