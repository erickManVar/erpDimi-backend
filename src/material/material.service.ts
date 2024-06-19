import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Material } from '@prisma/client';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async getAllMaterials(): Promise<Material[]> {
    try {
      return this.prisma.material.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch materials');
    }
  }

  async getMaterialById(id: number): Promise<Material | null> {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    return material;
  }

  async createMaterial(data: CreateMaterialDto): Promise<Material> {
    const { projectId, ...materialData } = data;

    try {
      return this.prisma.material.create({
        data: {
          ...materialData,
          entryDate: new Date(data.entryDate),
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create material');
    }
  }

  async updateMaterial(id: number, data: UpdateMaterialDto): Promise<Material> {
    const { projectId, ...materialData } = data;

    try {
      const material = await this.prisma.material.findUnique({ where: { id } });

      if (!material) {
        throw new NotFoundException(`Material with ID ${id} not found`);
      }

      return this.prisma.material.update({
        where: { id },
        data: {
          ...materialData,
          entryDate: new Date(data.entryDate),
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update material');
    }
  }

  async deleteMaterial(id: number): Promise<Material> {
    try {
      const material = await this.prisma.material.findUnique({ where: { id } });

      if (!material) {
        throw new NotFoundException(`Material with ID ${id} not found`);
      }

      return this.prisma.material.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete material');
    }
  }
}
