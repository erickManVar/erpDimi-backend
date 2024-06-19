import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { StageModule } from './stage/stage.module';
import { TaskModule } from './task/task.module';
import { SubTaskModule } from './sub-task/sub-task.module';
import { SubTaskMaterialModule } from './sub-task-material/sub-task-material.module';
import { MaterialModule } from './material/material.module';
import { ContractorModule } from './contractor/contractor.module';
import { ProgressModule } from './progress/progress.module';
import { SupplierModule } from './supplier/supplier.module';
import { MaterialOrderModule } from './material-order/material-order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProjectModule,
    StageModule,
    TaskModule,
    SubTaskModule,
    SubTaskMaterialModule,
    MaterialModule,
    ContractorModule,
    ProgressModule,
    SupplierModule,
    MaterialOrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
