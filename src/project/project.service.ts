import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects(): Promise<Project[]> {
    try {
      return this.prisma.project.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch projects');
    }
  }

  async getProjectById(id: number): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    const { userId, ...projectData } = data;

    try {
      return this.prisma.project.create({
        data: {
          ...projectData,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async updateProject(id: number, data: UpdateProjectDto): Promise<Project> {
    const { userId, ...projectData } = data;

    try {
      const project = await this.prisma.project.findUnique({ where: { id } });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      return this.prisma.project.update({
        where: { id },
        data: {
          ...projectData,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  async deleteProject(id: number): Promise<Project> {
    try {
      const project = await this.prisma.project.findUnique({ where: { id } });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      return this.prisma.project.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete project');
    }
  }
}
