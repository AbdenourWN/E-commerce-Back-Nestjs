import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { BrandService } from './brands.service';
import { CreateBrandDto } from './brands.Dto/create-brand.dto';
import { UpdateBrandDto } from './brands.Dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, imageFilter } from 'src/multer.config';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.brandService.getAll();
  }

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
    @Body() createBrandDto: CreateBrandDto,
  ) {
    return this.brandService.create(createBrandDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.brandService.getById(id);
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
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}
