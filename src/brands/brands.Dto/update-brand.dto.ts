import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsOptional()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
