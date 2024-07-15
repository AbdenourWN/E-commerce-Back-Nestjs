import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './models/brands';
import { CreateBrandDto } from './brands.Dto/create-brand.dto';
import { UpdateBrandDto } from './brands.Dto/update-brand.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly BrandModel: Model<BrandDocument>,
  ) {}

  async create(
    createBrandDto: CreateBrandDto,
    file: Express.Multer.File,
  ): Promise<Brand> {
    try {
      createBrandDto.name = createBrandDto.name.toLowerCase();
      const exist = await this.BrandModel.findOne({
        name: createBrandDto.name,
      });
      if (exist) {
        throw new HttpException(
          'Brand Name already exists',
          HttpStatus.CONFLICT,
        );
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : null;
      const brand = new this.BrandModel({
        ...createBrandDto,
        image: imageUrl,
      });
      return await brand.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Brand[]> {
    try {
      return await this.BrandModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Brand> {
    try {
      const brand = await this.BrandModel.findById(id).exec();
      if (!brand) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }
      return brand;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    file: Express.Multer.File,
  ): Promise<Brand> {
    try {
      const brand = await this.BrandModel.findById(id);
      if (!brand) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }
      if (updateBrandDto.name) {
        updateBrandDto.name = updateBrandDto.name.toLowerCase();
        const exist = await this.BrandModel.findOne({
          name: updateBrandDto.name,
        });
        if (exist && exist._id.toString() !== id) {
          throw new HttpException(
            'Brand Name already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      if (brand.image && file) {
        this.deleteImage(brand.image);
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : brand.image;
      const updatedBrand = await this.BrandModel.findByIdAndUpdate(
        id,
        { ...updateBrandDto, image: imageUrl },
        {
          new: true,
        },
      );
      return updatedBrand;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const brand = await this.BrandModel.findByIdAndRemove(id).exec();
      if (!brand) {
        throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
      }
      if (brand.image) {
        this.deleteImage(brand.image);
      }
      return 'Brand deleted successfully';
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
