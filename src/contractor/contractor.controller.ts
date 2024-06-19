import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { Contractor } from '@prisma/client';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

@Controller('contractors')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Get()
  async getAllContractors(): Promise<Contractor[]> {
    return this.contractorService.getAllContractors();
  }

  @Get(':id')
  async getContractorById(@Param('id') id: number): Promise<Contractor | null> {
    return this.contractorService.getContractorById(Number(id));
  }

  @Post()
  async createContractor(@Body() createContractorDto: CreateContractorDto): Promise<Contractor> {
    return this.contractorService.createContractor(createContractorDto);
  }

  @Put(':id')
  async updateContractor(@Param('id') id: number, @Body() updateContractorDto: UpdateContractorDto): Promise<Contractor> {
    return this.contractorService.updateContractor(Number(id), updateContractorDto);
  }

  @Delete(':id')
  async deleteContractor(@Param('id') id: number): Promise<Contractor> {
    return this.contractorService.deleteContractor(Number(id));
  }
}
