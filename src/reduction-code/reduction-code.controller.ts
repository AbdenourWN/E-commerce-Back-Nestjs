import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReductionCodeService } from './reduction-code.service';
import { CreateReductionCodeDto } from './reduction-code.Dto/create-reduction-code.dto';
import { ReductionCode } from './models/reduction-code';
import { UpdateReductionCodeDto } from './reduction-code.Dto/update-reduction-code.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Role } from 'src/auth/roles/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/role.decorator';
@ApiTags('reduction-codes')
@Controller('reduction-codes')
export class ReductionCodeController {
  constructor(private readonly reductionCodeService: ReductionCodeService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  createReductionCode(
    @Body() createReductionCodeDto: CreateReductionCodeDto,
  ): Promise<ReductionCode> {
    return this.reductionCodeService.createReductionCode(
      createReductionCodeDto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  getAllReductionCodes(): Promise<ReductionCode[]> {
    return this.reductionCodeService.getAllReductionCodes();
  }

  @Get(':code')
  getReductionCodeByCode(@Param('code') code: string): Promise<ReductionCode> {
    return this.reductionCodeService.getReductionCodeByCode(code);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put(':code')
  updateReductionCode(
    @Param('code') code: string,
    @Body() updateReductionCodeDto: UpdateReductionCodeDto,
  ): Promise<ReductionCode> {
    return this.reductionCodeService.updateReductionCode(
      code,
      updateReductionCodeDto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':code')
  deleteReductionCode(@Param('code') code: string): Promise<string> {
    return this.reductionCodeService.deleteReductionCode(code);
  }
}
