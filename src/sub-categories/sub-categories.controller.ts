import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/role.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubcategoryService } from './sub-categories.service';
import { CreateSubcategoryDto } from './sub-categories.Dto/create-sub-category.dto';
import { UpdateSubcategoryDto } from './sub-categories.Dto/update-sub-category.dto';

@ApiTags('subcategories')
@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  findAll() {
    return this.subcategoryService.getAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.subcategoryService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.create(createSubcategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.update(id, updateSubcategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subcategoryService.delete(id);
  }
}
