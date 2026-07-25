import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperAdminService } from './super-admin.service';
import { TenantRegistrationDto } from '@plux-max/types';

@ApiTags('Super Admin & Multi-Tenancy')
@Controller('api/v1/super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Get('tenants')
  @ApiOperation({ summary: 'List all onboarded enterprise tenants' })
  async getTenants() {
    return this.superAdminService.getTenants();
  }

  @Post('tenants')
  @ApiOperation({ summary: 'Provision new hospital/college tenant' })
  async createTenant(@Body() dto: TenantRegistrationDto) {
    return this.superAdminService.createTenant(dto);
  }
}
