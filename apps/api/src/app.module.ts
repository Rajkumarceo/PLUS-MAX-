import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HospitalCoreModule } from './modules/hospital-core/hospital-core.module';
import { AiAnalyticsModule } from './modules/ai-analytics/ai-analytics.module';
import { FinancialModule } from './modules/financial/financial.module';
import { AcademicModule } from './modules/academic/academic.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';

@Module({
  imports: [
    AuthModule,
    HospitalCoreModule,
    AiAnalyticsModule,
    FinancialModule,
    AcademicModule,
    SuperAdminModule,
  ],
})
export class AppModule {}
