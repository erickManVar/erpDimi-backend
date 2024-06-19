import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MaterialService } from './material.service';
import { Material as MaterialModel } from '@prisma/client';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getAllMaterials(): Promise<MaterialModel[]> {
    return this.materialService.getAllMaterials();
  }

  @Get(':id')
  async getMaterialById(@Param('id') id: number): Promise<MaterialModel | null> {
    return this.materialService.getMaterialById(Number(id));
  }

  @Post()
  async createMaterial(@Body() createMaterialDto: CreateMaterialDto): Promise<MaterialModel> {
    return this.materialService.createMaterial(createMaterialDto);
  }

  @Put(':id')
  async updateMaterial(@Param('id') id: number, @Body() updateMaterialDto: UpdateMaterialDto): Promise<MaterialModel> {
    return this.materialService.updateMaterial(Number(id), updateMaterialDto);
  }

  @Delete(':id')
  async deleteMaterial(@Param('id') id: number): Promise<MaterialModel> {
    return this.materialService.deleteMaterial(Number(id));
  }
}
