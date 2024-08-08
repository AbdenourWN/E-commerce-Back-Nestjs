import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './models/gallery';
import { CreateGalleryDto } from './gallery.Dto/create-gallery.dto';
import { UpdateGalleryDto } from './gallery.Dto/update-gallery.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name)
    private readonly galleryModel: Model<GalleryDocument>,
  ) {}

  async create(
    createGalleryDto: CreateGalleryDto,
    file: Express.Multer.File,
  ): Promise<Gallery> {
    try {
      const gallery = await this.galleryModel.findOne({
        title: createGalleryDto.title,
      });
      if (gallery) {
        throw new HttpException('Gallery already exists', HttpStatus.CONFLICT);
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : null;
      const createdGallery = new this.galleryModel({
        ...createGalleryDto,
        image: imageUrl,
      });
      return await createdGallery.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }

  async findById(id: string): Promise<Gallery> {
    return this.galleryModel.findById(id).exec();
  }

  async update(
    id: string,
    updateGalleryDto: UpdateGalleryDto,
    file: Express.Multer.File,
  ): Promise<Gallery> {
    try {
      const gallery = await this.galleryModel.findById(id);
      if (!gallery) {
        throw new HttpException('Gallery not found', HttpStatus.NOT_FOUND);
      }
      if (gallery.image && file) {
        this.deleteImage(gallery.image);
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : gallery.image;
      const updatedGallery = await this.galleryModel.findByIdAndUpdate(
        id,
        { ...updateGalleryDto, image: imageUrl },
        { new: true },
      );
      return updatedGallery;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const gallery = await this.galleryModel.findByIdAndRemove(id).exec();
      if (!gallery) {
        throw new HttpException('Gallery not found', HttpStatus.NOT_FOUND);
      }
      if (gallery.image) {
        this.deleteImage(gallery.image);
      }
      return 'Gallery deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private deleteImage(filename: string) {
    const Filename = filename.split('/').pop();
    const imagePath = path.join(__dirname, '..', '..', 'uploads', Filename);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(`Error deleting image: ${err}`);
      } else {
        console.log(`Successfully deleted image: ${imagePath}`);
      }
    });
  }
}
