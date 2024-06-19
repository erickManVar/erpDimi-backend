import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateContractorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsInt()
  projectId: number;
}
