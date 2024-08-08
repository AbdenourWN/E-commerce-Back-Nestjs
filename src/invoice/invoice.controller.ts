import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './invoice.dto/create-invoice.dto';
import { Invoice } from './models/invoice';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateInvoiceDto } from './invoice.dto/update-invoice.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.remove(id);
  }
}
