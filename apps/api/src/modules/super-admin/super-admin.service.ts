import { Injectable } from '@nestjs/common';
import { ApiResponse, TenantRegistrationDto } from '@plux-max/types';

@Injectable()
export class SuperAdminService {
  private tenants = [
    {
      id: 't-1',
      name: 'AIIMS Super Specialty Hospital & College',
      code: 'aiims-delhi',
      domain: 'aiims.pluxmax.com',
      status: 'ACTIVE',
      planName: 'ENTERPRISE_HOSPITAL_COLLEGE',
      maxBeds: 1500,
      maxStudents: 2000,
      createdAt: new Date().toISOString(),
    },
    {
      id: 't-2',
      name: 'Apollo Hospital & Institute of Health Sciences',
      code: 'apollo-hyderabad',
      domain: 'apollo.pluxmax.com',
      status: 'ACTIVE',
      planName: 'ENTERPRISE_HOSPITAL_COLLEGE',
      maxBeds: 800,
      maxStudents: 1000,
      createdAt: new Date().toISOString(),
    },
  ];

  async getTenants(): Promise<ApiResponse> {
    return {
      success: true,
      data: this.tenants,
      timestamp: new Date().toISOString(),
    };
  }

  async createTenant(dto: TenantRegistrationDto): Promise<ApiResponse> {
    const newTenant = {
      id: `t-${Date.now()}`,
      name: dto.name,
      code: dto.code,
      domain: dto.domain || `${dto.code}.pluxmax.com`,
      status: 'ACTIVE',
      planName: dto.planName,
      maxBeds: 500,
      maxStudents: 500,
      createdAt: new Date().toISOString(),
    };

    this.tenants.unshift(newTenant);

    return {
      success: true,
      message: 'New enterprise tenant provisioned successfully',
      data: newTenant,
      timestamp: new Date().toISOString(),
    };
  }
}
