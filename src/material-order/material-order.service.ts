import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MaterialOrder } from '@prisma/client';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { UpdateMaterialOrderDto } from './dto/update-material-order.dto';

@Injectable()
export class MaterialOrderService {
  constructor(private prisma: PrismaService) {}

  async getAllMaterialOrders(): Promise<MaterialOrder[]> {
    try {
      return this.prisma.materialOrder.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch material orders');
    }
  }

  async getMaterialOrderById(id: number): Promise<MaterialOrder | null> {
    const materialOrder = await this.prisma.materialOrder.findUnique({
      where: { id },
    });

    if (!materialOrder) {
      throw new NotFoundException(`Material order with ID ${id} not found`);
    }

    return materialOrder;
  }

  async createMaterialOrder(data: CreateMaterialOrderDto): Promise<MaterialOrder> {
    const { materialId, supplierId, ...orderData } = data;

    try {
      return this.prisma.materialOrder.create({
        data: {
          ...orderData,
          orderDate: new Date(data.orderDate),
          deliveryDate: new Date(data.deliveryDate),
          material: {
            connect: {
              id: materialId,
            },
          },
          supplier: {
            connect: {
              id: supplierId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create material order');
    }
  }

  async updateMaterialOrder(id: number, data: UpdateMaterialOrderDto): Promise<MaterialOrder> {
    const { materialId, supplierId, ...orderData } = data;

    try {
      const materialOrder = await this.prisma.materialOrder.findUnique({ where: { id } });

      if (!materialOrder) {
        throw new NotFoundException(`Material order with ID ${id} not found`);
      }

      return this.prisma.materialOrder.update({
        where: { id },
        data: {
          ...orderData,
          orderDate: new Date(data.orderDate),
          deliveryDate: new Date(data.deliveryDate),
          material: {
            connect: {
              id: materialId,
            },
          },
          supplier: {
            connect: {
              id: supplierId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update material order');
    }
  }

  async deleteMaterialOrder(id: number): Promise<MaterialOrder> {
    try {
      const materialOrder = await this.prisma.materialOrder.findUnique({ where: { id } });

      if (!materialOrder) {
        throw new NotFoundException(`Material order with ID ${id} not found`);
      }

      return this.prisma.materialOrder.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete material order');
    }
  }
}
