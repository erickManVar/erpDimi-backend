import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress as ProgressModel } from '@prisma/client';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async getAllProgress(): Promise<ProgressModel[]> {
    return this.progressService.getAllProgress();
  }

  @Get(':id')
  async getProgressById(@Param('id') id: number): Promise<ProgressModel | null> {
    return this.progressService.getProgressById(Number(id));
  }

  @Post()
  async createProgress(@Body() createProgressDto: CreateProgressDto): Promise<ProgressModel> {
    return this.progressService.createProgress(createProgressDto);
  }

  @Put(':id')
  async updateProgress(@Param('id') id: number, @Body() updateProgressDto: UpdateProgressDto): Promise<ProgressModel> {
    return this.progressService.updateProgress(Number(id), updateProgressDto);
  }

  @Delete(':id')
  async deleteProgress(@Param('id') id: number): Promise<ProgressModel> {
    return this.progressService.deleteProgress(Number(id));
  }
}
