import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
  UploadedFile,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter, storage } from 'src/multer.config';
import { CreateSettingsDto } from './dto/settings.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('websiteLogo', {
      storage: storage,
      fileFilter: imageFilter,
    }),
  )
  async updateOrCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateSettingsDto: CreateSettingsDto,
  ) {
    return this.settingsService.updateOrCreate(updateSettingsDto, file);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  async get() {
    return this.settingsService.get();
  }
}
