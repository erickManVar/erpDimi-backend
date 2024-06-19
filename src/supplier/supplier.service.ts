import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Supplier } from '@prisma/client';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async getAllSuppliers(): Promise<Supplier[]> {
    try {
      return this.prisma.supplier.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch suppliers');
    }
  }

  async getSupplierById(id: number): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return supplier;
  }

  async createSupplier(data: CreateSupplierDto): Promise<Supplier> {
    try {
      return this.prisma.supplier.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create supplier');
    }
  }

  async updateSupplier(id: number, data: UpdateSupplierDto): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.findUnique({ where: { id } });

      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }

      return this.prisma.supplier.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update supplier');
    }
  }

  async deleteSupplier(id: number): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.findUnique({ where: { id } });

      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }

      return this.prisma.supplier.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete supplier');
    }
  }
}
