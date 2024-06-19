import { IsString, IsNotEmpty, IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  budget: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsInt()
  userId: number;
}
