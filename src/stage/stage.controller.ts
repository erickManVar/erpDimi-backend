import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StageService } from './stage.service';
import { Stage as StageModel } from '@prisma/client';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Controller('stages')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  async getAllStages(): Promise<StageModel[]> {
    return this.stageService.getAllStages();
  }

  @Get(':id')
  async getStageById(@Param('id') id: number): Promise<StageModel | null> {
    return this.stageService.getStageById(Number(id));
  }

  @Post()
  async createStage(@Body() createStageDto: CreateStageDto): Promise<StageModel> {
    return this.stageService.createStage(createStageDto);
  }

  @Put(':id')
  async updateStage(@Param('id') id: number, @Body() updateStageDto: UpdateStageDto): Promise<StageModel> {
    return this.stageService.updateStage(Number(id), updateStageDto);
  }

  @Delete(':id')
  async deleteStage(@Param('id') id: number): Promise<StageModel> {
    return this.stageService.deleteStage(Number(id));
  }
}
