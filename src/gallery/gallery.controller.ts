import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './gallery.Dto/create-gallery.dto';
import { UpdateGalleryDto } from './gallery.Dto/update-gallery.dto';
import { Roles } from 'src/auth/roles/role.decorator';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Role } from 'src/auth/roles/role.enum';
import { storage, imageFilter } from 'src/multer.config';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storage,
      fileFilter: imageFilter,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGalleryDto: CreateGalleryDto,
  ) {
    return this.galleryService.create(createGalleryDto, file);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.galleryService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storage,
      fileFilter: imageFilter,
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleryService.update(id, updateGalleryDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}
