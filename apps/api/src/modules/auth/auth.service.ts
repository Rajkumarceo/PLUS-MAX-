import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, PersonaRoleKey, UserPersonaDto, MultiRoleLoginDto } from '@plux-max/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private personas: Record<PersonaRoleKey, UserPersonaDto> = {
    STUDENT: {
      roleKey: 'STUDENT',
      title: 'Medical Student (MBBS)',
      name: 'Rohan Deshmukh',
      email: 'rohan.mbbs2023@aiims.edu',
      avatarBadge: 'RD',
      tenantName: 'AIIMS Super Specialty Medical College',
      defaultDomain: 'ACADEMIC',
      permissions: ['student:profile:read_own', 'student:attendance:read_own', 'student:logbook:write_own'],
    },
    DOCTOR: {
      roleKey: 'DOCTOR',
      title: 'Chief Medical Officer / HOD',
      name: 'Dr. Rajesh Kumar',
      email: 'dr.rajesh@aiims.edu',
      avatarBadge: 'DR',
      tenantName: 'AIIMS Super Specialty Hospital',
      defaultDomain: 'HOSPITAL',
      permissions: ['emr:patient:read_assigned', 'emr:patient:write_assigned', 'emr:opd:operate'],
    },
    NURSE: {
      roleKey: 'NURSE',
      title: 'Senior ICU Charge Nurse',
      name: 'Priya Sharma',
      email: 'nurse.priya@aiims.edu',
      avatarBadge: 'NS',
      tenantName: 'AIIMS Super Specialty Hospital',
      defaultDomain: 'HOSPITAL',
      permissions: ['staff:profile:read_own', 'staff:shift:read_own', 'hospital:beds:read'],
    },
    HOSPITAL_ADMIN: {
      roleKey: 'HOSPITAL_ADMIN',
      title: 'Hospital Finance & Billing Admin',
      name: 'Suresh Verma',
      email: 'admin.billing@aiims.edu',
      avatarBadge: 'FA',
      tenantName: 'AIIMS Super Specialty Hospital',
      defaultDomain: 'FINANCIAL',
      permissions: ['billing:invoices:create', 'billing:pos:collect'],
    },
    COLLEGE_ADMIN: {
      roleKey: 'COLLEGE_ADMIN',
      title: 'Dean of Academic Affairs',
      name: 'Dr. Meera Mehta',
      email: 'dean.academics@aiims.edu',
      avatarBadge: 'DE',
      tenantName: 'AIIMS Medical College Governance',
      defaultDomain: 'ACADEMIC',
      permissions: ['academic:curriculum:manage', 'academic:nmc_report:generate'],
    },
    SUPER_ADMIN: {
      roleKey: 'SUPER_ADMIN',
      title: 'Enterprise Platform Super Admin',
      name: 'System Root Admin',
      email: 'root@pluxmax.com',
      avatarBadge: 'SA',
      tenantName: 'PLUX MAX Enterprise SaaS Global',
      defaultDomain: 'SUPER_ADMIN',
      permissions: ['*:*'],
    },
  };

  async personaLogin(dto: MultiRoleLoginDto): Promise<ApiResponse> {
    const persona = this.personas[dto.roleKey] || this.personas.DOCTOR;

    const payload = {
      sub: persona.email,
      roleKey: persona.roleKey,
      name: persona.name,
      tenantName: persona.tenantName,
      permissions: persona.permissions,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      message: `Authenticated successfully as ${persona.title}`,
      data: {
        accessToken,
        persona,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async getPersonas(): Promise<ApiResponse<UserPersonaDto[]>> {
    return {
      success: true,
      data: Object.values(this.personas),
      timestamp: new Date().toISOString(),
    };
  }
}
