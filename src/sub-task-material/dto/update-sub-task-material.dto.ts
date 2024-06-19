import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTaskMaterialDto } from './create-sub-task-material.dto';

export class UpdateSubTaskMaterialDto extends PartialType(CreateSubTaskMaterialDto) {}
