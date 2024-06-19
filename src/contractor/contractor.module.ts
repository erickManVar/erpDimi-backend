import { Module } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { ContractorController } from './contractor.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContractorService],
  controllers: [ContractorController],
})
export class ContractorModule {}
