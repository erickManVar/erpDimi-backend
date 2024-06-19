import { IsInt, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProgressDto {
  @IsInt()
  week: number;

  @IsString()
  @IsNotEmpty()
  progress: string;

  @IsNumber()
  cost: number;

  @IsInt()
  contractorId: number;

  @IsInt()
  projectId: number;
}
