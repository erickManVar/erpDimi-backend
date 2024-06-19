import { IsString, IsNotEmpty, IsInt, IsNumber, IsDateString } from 'class-validator';

export class CreateSubTaskMaterialDto {
  @IsInt()
  subTaskId: number;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsDateString()
  entryDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  totalToUse: number;
}
