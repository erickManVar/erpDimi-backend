import { Module } from '@nestjs/common';
import { MaterialOrderService } from './material-order.service';
import { MaterialOrderController } from './material-order.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MaterialOrderService],
  controllers: [MaterialOrderController],
})
export class MaterialOrderModule {}
