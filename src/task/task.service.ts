import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    try {
      return this.prisma.task.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    const { stageId, ...taskData } = data;

    try {
      return this.prisma.task.create({
        data: {
          ...taskData,
          stage: {
            connect: {
              id: stageId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    const { stageId, ...taskData } = data;

    try {
      const task = await this.prisma.task.findUnique({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return this.prisma.task.update({
        where: { id },
        data: {
          ...taskData,
          stage: {
            connect: {
              id: stageId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(id: number): Promise<Task> {
    try {
      const task = await this.prisma.task.findUnique({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
