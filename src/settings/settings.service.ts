import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './models/settings';
import * as fs from 'fs';
import * as path from 'path';
import { CreateSettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
  ) {}

  async create(
    createSettingsDto: CreateSettingsDto,

    websiteLogo?: Express.Multer.File,
  ): Promise<Settings> {
    try {
      const websiteLogoUrl = websiteLogo
        ? `${process.env.baseURL}/uploads/${websiteLogo.filename}`
        : null;
      //   const footerLogoUrl = footerLogo
      //     ? `${process.env.BASE_URL}/uploads/${footerLogo.filename}`
      //     : null;
      const settings = new this.settingsModel({
        ...createSettingsDto,
        deliveryPrice: parseFloat(createSettingsDto.deliveryPrice),
        freeDeliveryThreshold: parseFloat(
          createSettingsDto.freeDeliveryThreshold,
        ),
        websiteLogo: websiteLogoUrl,
      });
      return await settings.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateSettingsDto: CreateSettingsDto,

    websiteLogo?: Express.Multer.File,
  ): Promise<Settings> {
    try {
      const settings = await this.settingsModel.findById(id);
      if (!settings) {
        throw new HttpException('Settings not found', HttpStatus.NOT_FOUND);
      }
      if (settings.websiteLogo && websiteLogo) {
        this.deleteImage(settings.websiteLogo);
      }
      //   if (settings.footerLogo && files.footerLogo) {
      //     this.deleteImage(settings.footerLogo);
      //   }
      const websiteLogoUrl = websiteLogo
        ? `${process.env.baseURL}/uploads/${websiteLogo.filename}`
        : settings.websiteLogo;
      //   const footerLogoUrl = footerLogo
      //     ? `${process.env.BASE_URL}/uploads/${footerLogo.filename}`
      //     : settings.footerLogo;
      const updatedSettings = await this.settingsModel.findByIdAndUpdate(
        id,
        {
          ...updateSettingsDto,
          deliveryPrice: parseFloat(updateSettingsDto.deliveryPrice),
          freeDeliveryThreshold: parseFloat(
            updateSettingsDto.freeDeliveryThreshold,
          ),
          websiteLogo: websiteLogoUrl,
        },
        { new: true },
      );
      return updatedSettings;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOrCreate(
    updateSettingsDto: CreateSettingsDto,

    websiteLogo?: Express.Multer.File,
  ): Promise<Settings> {
    const existingSettings = await this.settingsModel.findOne().exec();
    if (existingSettings) {
      return this.update(existingSettings._id, updateSettingsDto, websiteLogo);
    } else {
      return this.create(updateSettingsDto, websiteLogo);
    }
  }
  async get(): Promise<Settings> {
    const settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      throw new HttpException('Settings not found', HttpStatus.NOT_FOUND);
    }
    return settings;
  }

  private deleteImage(url: string) {
    const filename = url.split('/').pop();
    const imagePath = path.join(__dirname, '..', '..', 'uploads', filename);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(`Error deleting image: ${err}`);
      } else {
        console.log(`Successfully deleted image: ${imagePath}`);
      }
    });
  }
}
