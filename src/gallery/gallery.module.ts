import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gallery, GallerySchema } from './models/gallery';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  providers: [GalleryService],
  controllers: [GalleryController],
})
export class GalleryModule {}
