import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
