import { Module } from '@nestjs/common';
import { HospitalCoreService } from './hospital-core.service';
import { HospitalCoreController } from './hospital-core.controller';

@Module({
  controllers: [HospitalCoreController],
  providers: [HospitalCoreService],
  exports: [HospitalCoreService],
})
export class HospitalCoreModule {}
