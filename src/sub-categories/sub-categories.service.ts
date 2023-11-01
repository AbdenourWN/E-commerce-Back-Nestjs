import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory, SubcategoryDocument } from './models/sub-categories';
import { CreateSubcategoryDto } from './sub-categories.Dto/create-sub-category.dto';
import { UpdateSubcategoryDto } from './sub-categories.Dto/update-sub-category.dto';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel(Subcategory.name)
    private readonly SubcategoryModel: Model<SubcategoryDocument>,
  ) {}

  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    try {
      const subcategory = new this.SubcategoryModel(createSubcategoryDto);
      return await subcategory.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Subcategory[]> {
    try {
      return await this.SubcategoryModel.find()
        .populate({ path: 'categoryId', model: 'Category' })
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Subcategory> {
    try {
      const subcategory = await this.SubcategoryModel.findById(id)
        .populate({ path: 'categoryId', model: 'Category' })
        .exec();
      if (!subcategory) {
        throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
      }
      return subcategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<Subcategory> {
    try {
      const subcategory = await this.SubcategoryModel.findByIdAndUpdate(
        id,
        updateSubcategoryDto,
        {
          new: true,
        },
      );
      if (!subcategory) {
        throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
      }
      return subcategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const result = await this.SubcategoryModel.findByIdAndRemove(id).exec();
      if (!result) {
        throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
      }
      return 'Subcategory deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
