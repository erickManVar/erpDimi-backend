import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTask as SubTaskModel } from '@prisma/client';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Controller('sub-tasks')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Get()
  async getAllSubTasks(): Promise<SubTaskModel[]> {
    return this.subTaskService.getAllSubTasks();
  }

  @Get(':id')
  async getSubTaskById(@Param('id') id: number): Promise<SubTaskModel | null> {
    return this.subTaskService.getSubTaskById(Number(id));
  }

  @Post()
  async createSubTask(@Body() createSubTaskDto: CreateSubTaskDto): Promise<SubTaskModel> {
    return this.subTaskService.createSubTask(createSubTaskDto);
  }

  @Put(':id')
  async updateSubTask(@Param('id') id: number, @Body() updateSubTaskDto: UpdateSubTaskDto): Promise<SubTaskModel> {
    return this.subTaskService.updateSubTask(Number(id), updateSubTaskDto);
  }

  @Delete(':id')
  async deleteSubTask(@Param('id') id: number): Promise<SubTaskModel> {
    return this.subTaskService.deleteSubTask(Number(id));
  }
}
