import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsDate,
  IsDateString,
} from 'class-validator';

export class UpdateReductionCodeDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  discountPercentage: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  expirationDate: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
