import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubTask } from '@prisma/client';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Injectable()
export class SubTaskService {
  constructor(private prisma: PrismaService) {}

  async getAllSubTasks(): Promise<SubTask[]> {
    try {
      return this.prisma.subTask.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch sub-tasks');
    }
  }

  async getSubTaskById(id: number): Promise<SubTask | null> {
    const subTask = await this.prisma.subTask.findUnique({
      where: { id },
    });

    if (!subTask) {
      throw new NotFoundException(`Sub-task with ID ${id} not found`);
    }

    return subTask;
  }

  async createSubTask(data: CreateSubTaskDto): Promise<SubTask> {
    const { taskId, ...subTaskData } = data;

    try {
      return this.prisma.subTask.create({
        data: {
          ...subTaskData,
          task: {
            connect: {
              id: taskId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create sub-task');
    }
  }

  async updateSubTask(id: number, data: UpdateSubTaskDto): Promise<SubTask> {
    const { taskId, ...subTaskData } = data;

    try {
      const subTask = await this.prisma.subTask.findUnique({ where: { id } });

      if (!subTask) {
        throw new NotFoundException(`Sub-task with ID ${id} not found`);
      }

      return this.prisma.subTask.update({
        where: { id },
        data: {
          ...subTaskData,
          task: {
            connect: {
              id: taskId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update sub-task');
    }
  }

  async deleteSubTask(id: number): Promise<SubTask> {
    try {
      const subTask = await this.prisma.subTask.findUnique({ where: { id } });

      if (!subTask) {
        throw new NotFoundException(`Sub-task with ID ${id} not found`);
      }

      return this.prisma.subTask.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete sub-task');
    }
  }
}
