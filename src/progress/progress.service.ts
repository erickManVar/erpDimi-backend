import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Progress } from '@prisma/client';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getAllProgress(): Promise<Progress[]> {
    try {
      return this.prisma.progress.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch progress');
    }
  }

  async getProgressById(id: number): Promise<Progress | null> {
    const progress = await this.prisma.progress.findUnique({
      where: { id },
    });

    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return progress;
  }

  async createProgress(data: CreateProgressDto): Promise<Progress> {
    const { contractorId, projectId, ...progressData } = data;

    try {
      return this.prisma.progress.create({
        data: {
          ...progressData,
          contractor: {
            connect: {
              id: contractorId,
            },
          },
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create progress');
    }
  }

  async updateProgress(id: number, data: UpdateProgressDto): Promise<Progress> {
    const { contractorId, projectId, ...progressData } = data;

    try {
      const progress = await this.prisma.progress.findUnique({ where: { id } });

      if (!progress) {
        throw new NotFoundException(`Progress with ID ${id} not found`);
      }

      return this.prisma.progress.update({
        where: { id },
        data: {
          ...progressData,
          contractor: {
            connect: {
              id: contractorId,
            },
          },
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update progress');
    }
  }

  async deleteProgress(id: number): Promise<Progress> {
    try {
      const progress = await this.prisma.progress.findUnique({ where: { id } });

      if (!progress) {
        throw new NotFoundException(`Progress with ID ${id} not found`);
      }

      return this.prisma.progress.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete progress');
    }
  }
}
