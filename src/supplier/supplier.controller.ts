import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Supplier as SupplierModel } from '@prisma/client';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getAllSuppliers(): Promise<SupplierModel[]> {
    return this.supplierService.getAllSuppliers();
  }

  @Get(':id')
  async getSupplierById(@Param('id') id: number): Promise<SupplierModel | null> {
    return this.supplierService.getSupplierById(Number(id));
  }

  @Post()
  async createSupplier(@Body() createSupplierDto: CreateSupplierDto): Promise<SupplierModel> {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Put(':id')
  async updateSupplier(@Param('id') id: number, @Body() updateSupplierDto: UpdateSupplierDto): Promise<SupplierModel> {
    return this.supplierService.updateSupplier(Number(id), updateSupplierDto);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: number): Promise<SupplierModel> {
    return this.supplierService.deleteSupplier(Number(id));
  }
}
