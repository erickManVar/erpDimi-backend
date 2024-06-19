import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MaterialOrderService } from './material-order.service';
import { MaterialOrder as MaterialOrderModel } from '@prisma/client';
import { CreateMaterialOrderDto } from './dto/create-material-order.dto';
import { UpdateMaterialOrderDto } from './dto/update-material-order.dto';

@Controller('material-orders')
export class MaterialOrderController {
  constructor(private readonly materialOrderService: MaterialOrderService) {}

  @Get()
  async getAllMaterialOrders(): Promise<MaterialOrderModel[]> {
    return this.materialOrderService.getAllMaterialOrders();
  }

  @Get(':id')
  async getMaterialOrderById(@Param('id') id: number): Promise<MaterialOrderModel | null> {
    return this.materialOrderService.getMaterialOrderById(Number(id));
  }

  @Post()
  async createMaterialOrder(@Body() createMaterialOrderDto: CreateMaterialOrderDto): Promise<MaterialOrderModel> {
    return this.materialOrderService.createMaterialOrder(createMaterialOrderDto);
  }

  @Put(':id')
  async updateMaterialOrder(@Param('id') id: number, @Body() updateMaterialOrderDto: UpdateMaterialOrderDto): Promise<MaterialOrderModel> {
    return this.materialOrderService.updateMaterialOrder(Number(id), updateMaterialOrderDto);
  }

  @Delete(':id')
  async deleteMaterialOrder(@Param('id') id: number): Promise<MaterialOrderModel> {
    return this.materialOrderService.deleteMaterialOrder(Number(id));
  }
}
