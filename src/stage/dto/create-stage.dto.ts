import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  projectId: number;
}
