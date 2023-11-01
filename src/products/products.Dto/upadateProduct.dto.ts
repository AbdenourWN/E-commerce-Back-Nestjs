import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsOptional()
  @ApiProperty({ required: false, default: '0' })
  quantity: string;

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
  @ApiProperty({ required: false, default: '0' })
  promotionAmount: string;

  @IsOptional()
  @ApiProperty({ required: false })
  brand: string;
}
