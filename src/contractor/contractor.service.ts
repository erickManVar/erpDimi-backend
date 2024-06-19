import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Contractor } from '@prisma/client';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

@Injectable()
export class ContractorService {
  constructor(private prisma: PrismaService) {}

  async getAllContractors(): Promise<Contractor[]> {
    try {
      return this.prisma.contractor.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch contractors');
    }
  }

  async getContractorById(id: number): Promise<Contractor | null> {
    const contractor = await this.prisma.contractor.findUnique({
      where: { id },
    });

    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }

    return contractor;
  }

  async createContractor(data: CreateContractorDto): Promise<Contractor> {
    try {
      return this.prisma.contractor.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create contractor');
    }
  }

  async updateContractor(id: number, data: UpdateContractorDto): Promise<Contractor> {
    try {
      const contractor = await this.prisma.contractor.findUnique({ where: { id } });

      if (!contractor) {
        throw new NotFoundException(`Contractor with ID ${id} not found`);
      }

      return this.prisma.contractor.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update contractor');
    }
  }

  async deleteContractor(id: number): Promise<Contractor> {
    try {
      const contractor = await this.prisma.contractor.findUnique({ where: { id } });

      if (!contractor) {
        throw new NotFoundException(`Contractor with ID ${id} not found`);
      }

      return this.prisma.contractor.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete contractor');
    }
  }
}
