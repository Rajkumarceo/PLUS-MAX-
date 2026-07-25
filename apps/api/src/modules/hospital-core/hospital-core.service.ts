import { Injectable } from '@nestjs/common';
import { ApiResponse, PatientRegistrationDto, BedOccupancyStatus } from '@plux-max/types';

@Injectable()
export class HospitalCoreService {
  private patients: any[] = [
    {
      id: 'pat-1',
      uhid: 'UHID-2026-9081',
      firstName: 'Aarav',
      lastName: 'Sharma',
      dateOfBirth: '1988-04-12',
      gender: 'MALE',
      phone: '+91 9876543210',
      bloodGroup: 'O+',
      emergencyContact: '+91 9876543211',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'pat-2',
      uhid: 'UHID-2026-9082',
      firstName: 'Priya',
      lastName: 'Verma',
      dateOfBirth: '1995-09-23',
      gender: 'FEMALE',
      phone: '+91 9812345678',
      bloodGroup: 'A+',
      emergencyContact: '+91 9812345679',
      createdAt: new Date().toISOString(),
    },
  ];

  async registerPatient(dto: PatientRegistrationDto): Promise<ApiResponse> {
    const newPatient = {
      id: `pat-${Date.now()}`,
      uhid: `UHID-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...dto,
      createdAt: new Date().toISOString(),
    };
    this.patients.unshift(newPatient);

    return {
      success: true,
      message: 'Patient registered successfully in UHID master',
      data: newPatient,
      timestamp: new Date().toISOString(),
    };
  }

  async getPatients(): Promise<ApiResponse> {
    return {
      success: true,
      data: this.patients,
      timestamp: new Date().toISOString(),
    };
  }

  async getBedOccupancy(): Promise<ApiResponse<BedOccupancyStatus[]>> {
    const data: BedOccupancyStatus[] = [
      {
        wardId: 'w-1',
        wardName: 'ICU Block A (Cardiology)',
        wardType: 'ICU',
        totalBeds: 20,
        occupiedBeds: 17,
        availableBeds: 3,
        occupancyRate: 85.0,
      },
      {
        wardId: 'w-2',
        wardName: 'General Surgery Ward 3',
        wardType: 'General',
        totalBeds: 50,
        occupiedBeds: 38,
        availableBeds: 12,
        occupancyRate: 76.0,
      },
      {
        wardId: 'w-3',
        wardName: 'Neurology OT Recovery',
        wardType: 'OT',
        totalBeds: 15,
        occupiedBeds: 6,
        availableBeds: 9,
        occupancyRate: 40.0,
      },
    ];

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}
