import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  stageId: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPriceLabor: number;

  @IsNumber()
  partialLabor: number;

  @IsNumber()
  partialMaterial: number;

  @IsNumber()
  subtotalContractor1: number;

  @IsNumber()
  total: number;

  @IsNumber()
  unitPriceIdeal: number;

  @IsNumber()
  subtotalIdeal: number;

  @IsNumber()
  totalIdeal: number;
}
