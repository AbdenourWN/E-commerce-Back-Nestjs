import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;
}
