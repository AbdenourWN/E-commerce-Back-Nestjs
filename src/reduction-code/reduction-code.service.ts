import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReductionCode, ReductionCodeDocument } from './models/reduction-code';
import { CreateReductionCodeDto } from './reduction-code.Dto/create-reduction-code.dto';
import { UpdateReductionCodeDto } from './reduction-code.Dto/update-reduction-code.dto';

@Injectable()
export class ReductionCodeService {
  constructor(
    @InjectModel(ReductionCode.name)
    private readonly reductionCodeModel: Model<ReductionCodeDocument>,
  ) {}

  async createReductionCode(
    createReductionCodeDto: CreateReductionCodeDto,
  ): Promise<ReductionCode> {
    const newReductionCode = new this.reductionCodeModel(
      createReductionCodeDto,
    );
    try {
      return await newReductionCode.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllReductionCodes(): Promise<ReductionCode[]> {
    try {
      return await this.reductionCodeModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getReductionCodeByCode(code: string): Promise<ReductionCode> {
    try {
      const reductionCode = await this.reductionCodeModel
        .findOne({ code })
        .exec();
      if (!reductionCode) {
        throw new HttpException(
          'Reduction code not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return reductionCode;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateReductionCode(
    code: string,
    updateReductionCodeDto: UpdateReductionCodeDto,
  ): Promise<ReductionCode> {
    try {
      const updatedReductionCode =
        await this.reductionCodeModel.findOneAndUpdate(
          { code },
          updateReductionCodeDto,
          { new: true },
        );
      if (!updatedReductionCode) {
        throw new HttpException(
          'Reduction code not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedReductionCode;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteReductionCode(code: string): Promise<string> {
    try {
      const result = await this.reductionCodeModel.findOneAndRemove({ code });
      if (!result) {
        throw new HttpException(
          'Reduction code not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return 'Reduction code deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
