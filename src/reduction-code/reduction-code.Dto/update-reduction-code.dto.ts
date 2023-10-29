import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UpdateReductionCodeDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @IsOptional()
  @IsDate()
  expirationDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
