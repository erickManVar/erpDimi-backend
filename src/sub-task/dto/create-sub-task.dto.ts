import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateSubTaskDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  taskId: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  partial: number;
}
