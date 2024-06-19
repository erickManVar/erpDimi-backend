import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project as ProjectModel } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(): Promise<ProjectModel[]> {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<ProjectModel | null> {
    return this.projectService.getProjectById(Number(id));
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<ProjectModel> {
    return this.projectService.createProject(createProjectDto);
  }

  @Put(':id')
  async updateProject(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectModel> {
    return this.projectService.updateProject(Number(id), updateProjectDto);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<ProjectModel> {
    return this.projectService.deleteProject(Number(id));
  }
}
