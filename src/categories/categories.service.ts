import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './models/categories';
import { CreateCategoryDto } from './categories.Dto/create-category.dto';
import { UpdateCategoryDto } from './categories.Dto/update-category.dto';
import * as fs from 'fs';
import * as path from 'path';
import {
  Subcategory,
  SubcategoryDocument,
} from 'src/sub-categories/models/sub-categories';
import { ProductDocument, Products } from 'src/products/models/products';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(Subcategory.name)
    private readonly SubcategoryModel: Model<SubcategoryDocument>,
    @InjectModel(Products.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Category> {
    try {
      const name = createCategoryDto.name.toLowerCase();
      const exist = await this.CategoryModel.findOne({
        name,
      });
      if (exist) {
        throw new HttpException('Category already exists', HttpStatus.CONFLICT);
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : null;
      const category = new this.CategoryModel({
        name,
        image: imageUrl,
      });
      return await category.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Category[]> {
    try {
      return await this.CategoryModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<Category> {
    try {
      const category = await this.CategoryModel.findById(id).exec();
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Category> {
    try {
      const category = await this.CategoryModel.findById(id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      if (updateCategoryDto.name) {
        updateCategoryDto.name = updateCategoryDto.name.toLowerCase();
        const exist = await this.CategoryModel.findOne({
          name: updateCategoryDto.name,
        });
        if (exist && exist._id.toString() !== id) {
          throw new HttpException(
            'Category Name already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      if (category.image && file) {
        this.deleteImage(category.image);
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : category.image;
      const updatedCategory = await this.CategoryModel.findByIdAndUpdate(
        id,
        { ...updateCategoryDto, image: imageUrl },
        { new: true },
      );
      return updatedCategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const result = await this.CategoryModel.findByIdAndRemove(id).exec();
      if (!result) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      if (result.image) {
        this.deleteImage(result.image);
      }
      await this.SubcategoryModel.deleteMany({ categoryId: result._id });
      await this.ProductModel.updateMany(
        { category: result._id },
        { $set: { category: null, subcategory: null } },
      );
      return 'Category deleted successfully';
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
