import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Stage } from '@prisma/client';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Injectable()
export class StageService {
  constructor(private prisma: PrismaService) {}

  async getAllStages(): Promise<Stage[]> {
    try {
      return this.prisma.stage.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch stages');
    }
  }

  async getStageById(id: number): Promise<Stage | null> {
    const stage = await this.prisma.stage.findUnique({
      where: { id },
    });

    if (!stage) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }

    return stage;
  }

  async createStage(data: CreateStageDto): Promise<Stage> {
    const { projectId, ...stageData } = data;

    try {
      return this.prisma.stage.create({
        data: {
          ...stageData,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create stage');
    }
  }

  async updateStage(id: number, data: UpdateStageDto): Promise<Stage> {
    const { projectId, ...stageData } = data;

    try {
      const stage = await this.prisma.stage.findUnique({ where: { id } });

      if (!stage) {
        throw new NotFoundException(`Stage with ID ${id} not found`);
      }

      return this.prisma.stage.update({
        where: { id },
        data: {
          ...stageData,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update stage');
    }
  }

  async deleteStage(id: number): Promise<Stage> {
    try {
      const stage = await this.prisma.stage.findUnique({ where: { id } });

      if (!stage) {
        throw new NotFoundException(`Stage with ID ${id} not found`);
      }

      return this.prisma.stage.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete stage');
    }
  }
}
