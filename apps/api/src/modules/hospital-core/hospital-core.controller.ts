import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HospitalCoreService } from './hospital-core.service';
import { PatientRegistrationDto } from '@plux-max/types';

@ApiTags('Core Hospital ERP')
@Controller('api/v1/hospital')
export class HospitalCoreController {
  constructor(private readonly hospitalService: HospitalCoreService) {}

  @Get('patients')
  @ApiOperation({ summary: 'List registered patients' })
  async getPatients() {
    return this.hospitalService.getPatients();
  }

  @Post('patients')
  @ApiOperation({ summary: 'Register new patient with UHID generation' })
  async registerPatient(@Body() dto: PatientRegistrationDto) {
    return this.hospitalService.registerPatient(dto);
  }

  @Get('beds/occupancy')
  @ApiOperation({ summary: 'Real-time Ward & Bed occupancy metrics' })
  async getBedOccupancy() {
    return this.hospitalService.getBedOccupancy();
  }
}
