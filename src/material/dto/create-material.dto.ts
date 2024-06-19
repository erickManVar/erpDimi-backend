import { IsString, IsNotEmpty, IsNumber, IsDateString, IsInt } from 'class-validator';

export class CreateMaterialDto {
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

  @IsInt()
  @IsNotEmpty()
  projectId: number;
}
