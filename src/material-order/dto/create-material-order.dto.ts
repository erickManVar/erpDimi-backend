import { IsInt, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateMaterialOrderDto {
  @IsInt()
  materialId: number;

  @IsInt()
  supplierId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  totalCost: number;

  @IsDateString()
  orderDate: string;

  @IsDateString()
  deliveryDate: string;
}
