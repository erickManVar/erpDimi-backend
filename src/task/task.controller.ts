import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task as TaskModel } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<TaskModel[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<TaskModel | null> {
    return this.taskService.getTaskById(Number(id));
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskModel> {
    return this.taskService.updateTask(Number(id), updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<TaskModel> {
    return this.taskService.deleteTask(Number(id));
  }
}
