import { Module } from '@nestjs/common';
import { SubTaskMaterialService } from './sub-task-material.service';
import { SubTaskMaterialController } from './sub-task-material.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SubTaskMaterialService],
  controllers: [SubTaskMaterialController],
})
export class SubTaskMaterialModule {}
