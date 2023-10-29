import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateGalleryDto {
  @IsOptional()
  @ApiProperty()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
