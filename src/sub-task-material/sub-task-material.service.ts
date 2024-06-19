import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubTaskMaterial } from '@prisma/client';
import { CreateSubTaskMaterialDto } from './dto/create-sub-task-material.dto';
import { UpdateSubTaskMaterialDto } from './dto/update-sub-task-material.dto';

@Injectable()
export class SubTaskMaterialService {
  constructor(private prisma: PrismaService) {}

  async getAllSubTaskMaterials(): Promise<SubTaskMaterial[]> {
    try {
      return this.prisma.subTaskMaterial.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch sub-task materials');
    }
  }

  async getSubTaskMaterialById(id: number): Promise<SubTaskMaterial | null> {
    const subTaskMaterial = await this.prisma.subTaskMaterial.findUnique({
      where: { id },
    });

    if (!subTaskMaterial) {
      throw new NotFoundException(`Sub-task material with ID ${id} not found`);
    }

    return subTaskMaterial;
  }

  async createSubTaskMaterial(data: CreateSubTaskMaterialDto): Promise<SubTaskMaterial> {
    const { subTaskId, ...materialData } = data;

    try {
      return this.prisma.subTaskMaterial.create({
        data: {
          ...materialData,
          entryDate: new Date(data.entryDate),
          subTask: {
            connect: {
              id: subTaskId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create sub-task material');
    }
  }

  async updateSubTaskMaterial(id: number, data: UpdateSubTaskMaterialDto): Promise<SubTaskMaterial> {
    const { subTaskId, ...materialData } = data;

    try {
      const subTaskMaterial = await this.prisma.subTaskMaterial.findUnique({ where: { id } });

      if (!subTaskMaterial) {
        throw new NotFoundException(`Sub-task material with ID ${id} not found`);
      }

      return this.prisma.subTaskMaterial.update({
        where: { id },
        data: {
          ...materialData,
          entryDate: new Date(data.entryDate),
          subTask: {
            connect: {
              id: subTaskId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update sub-task material');
    }
  }

  async deleteSubTaskMaterial(id: number): Promise<SubTaskMaterial> {
    try {
      const subTaskMaterial = await this.prisma.subTaskMaterial.findUnique({ where: { id } });

      if (!subTaskMaterial) {
        throw new NotFoundException(`Sub-task material with ID ${id} not found`);
      }

      return this.prisma.subTaskMaterial.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete sub-task material');
    }
  }
}
