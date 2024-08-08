import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductDocument } from './models/products';
import { CreateProductDto } from './products.Dto/creatproduct.dto';
import { UpdateProductDto } from './products.Dto/upadateProduct.dto';
import * as fs from 'fs';
import * as path from 'path';
import {
  Subcategory,
  SubcategoryDocument,
} from 'src/sub-categories/models/sub-categories';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly ProductModel: Model<ProductDocument>,
    @InjectModel(Subcategory.name)
    private readonly SubcategoryModel: Model<SubcategoryDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<Products> {
    try {
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : null;
      const subcategory = await this.SubcategoryModel.findById(
        createProductDto.subcategory,
      );
      if (
        !subcategory ||
        subcategory.categoryId.toString() !== createProductDto.category
      ) {
        throw new HttpException(
          'Subcategory not related to category chosen',
          HttpStatus.NOT_FOUND,
        );
      }
      const createdProduct = new this.ProductModel({
        ...createProductDto,
        quantity: parseInt(createProductDto.quantity),
        promotionAmount: parseFloat(createProductDto.promotionAmount),
        image: imageUrl,
      });

      return await createdProduct.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Products[]> {
    return this.ProductModel.find()
      .populate('category')
      .populate('subcategory')
      .populate('brand')
      .exec();
  }
  async getAllAvailable(): Promise<Products[]> {
    return this.ProductModel.find({ deleted: false })
      .populate('category')
      .populate('subcategory')
      .populate('brand')
      .exec();
  }

  async getProductbyId(id: string): Promise<Products> {
    const product = await this.ProductModel.findOne({ _id: id })
      .populate('category')
      .populate('subcategory')
      .populate('brand')
      .exec();
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async updateProduct(
    id: string,
    UpdateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ): Promise<Products> {
    try {
      const product = await this.ProductModel.findOne({
        _id: id,
      });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      if (product.image && file) {
        this.deleteImage(product.image);
      }
      const imageUrl = file
        ? `${process.env.baseURL}/uploads/${file.filename}`
        : product.image;
      const updatedProduct = await this.ProductModel.findByIdAndUpdate(
        id,
        {
          ...UpdateProductDto,
          image: imageUrl,
          quantity: parseInt(UpdateProductDto.quantity),
          promotionAmount: parseFloat(UpdateProductDto.promotionAmount),
        },
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async softDeleteProduct(id: string): Promise<string> {
    try {
      const product = await this.ProductModel.findOneAndUpdate(
        { _id: id, deleted: false },
        { deleted: true, deletedAt: new Date() },
        { new: true },
      ).exec();
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return 'Product soft deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async restoreProduct(id: string): Promise<string> {
    try {
      const product = await this.ProductModel.findOneAndUpdate(
        { _id: id, deleted: true },
        { deleted: false, deletedAt: null },
        { new: true },
      ).exec();
      if (!product) {
        throw new HttpException(
          'Product not found or not deleted',
          HttpStatus.NOT_FOUND,
        );
      }
      return 'Product restored successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProduct(id: string): Promise<string> {
    try {
      const product = await this.ProductModel.findByIdAndRemove(id).exec();
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      if (product.image) {
        this.deleteImage(product.image);
      }
      return 'Product deleted successfully';
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
