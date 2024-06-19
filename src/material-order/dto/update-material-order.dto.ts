import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialOrderDto } from './create-material-order.dto';

export class UpdateMaterialOrderDto extends PartialType(CreateMaterialOrderDto) {}
