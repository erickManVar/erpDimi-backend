import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubTaskMaterialService } from './sub-task-material.service';
import { SubTaskMaterial as SubTaskMaterialModel } from '@prisma/client';
import { CreateSubTaskMaterialDto } from './dto/create-sub-task-material.dto';
import { UpdateSubTaskMaterialDto } from './dto/update-sub-task-material.dto';

@Controller('sub-task-materials')
export class SubTaskMaterialController {
  constructor(private readonly subTaskMaterialService: SubTaskMaterialService) {}

  @Get()
  async getAllSubTaskMaterials(): Promise<SubTaskMaterialModel[]> {
    return this.subTaskMaterialService.getAllSubTaskMaterials();
  }

  @Get(':id')
  async getSubTaskMaterialById(@Param('id') id: number): Promise<SubTaskMaterialModel | null> {
    return this.subTaskMaterialService.getSubTaskMaterialById(Number(id));
  }

  @Post()
  async createSubTaskMaterial(@Body() createSubTaskMaterialDto: CreateSubTaskMaterialDto): Promise<SubTaskMaterialModel> {
    return this.subTaskMaterialService.createSubTaskMaterial(createSubTaskMaterialDto);
  }

  @Put(':id')
  async updateSubTaskMaterial(@Param('id') id: number, @Body() updateSubTaskMaterialDto: UpdateSubTaskMaterialDto): Promise<SubTaskMaterialModel> {
    return this.subTaskMaterialService.updateSubTaskMaterial(Number(id), updateSubTaskMaterialDto);
  }

  @Delete(':id')
  async deleteSubTaskMaterial(@Param('id') id: number): Promise<SubTaskMaterialModel> {
    return this.subTaskMaterialService.deleteSubTaskMaterial(Number(id));
  }
}
