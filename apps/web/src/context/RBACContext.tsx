'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type RoleType = 'staff' | 'student' | 'doctor' | 'admin' | 'billing' | 'pharmacy' | 'super-admin';

export interface UserRoleProfile {
  role: RoleType;
  name: string;
  title: string;
  id: string;
  badge: string;
  tenantName: string;
  route: string;
  permissions: string[];
}

export const ROLE_PROFILES: Record<RoleType, UserRoleProfile> = {
  student: {
    role: 'student',
    name: 'Rohan Deshmukh',
    title: 'Medical Student (MBBS)',
    id: 'std-101',
    badge: 'RD',
    tenantName: 'AIIMS Super Specialty Medical College',
    route: '/student',
    permissions: ['student:profile:read', 'student:logbook:write', 'student:attendance:read'],
  },
  staff: {
    role: 'staff',
    name: 'Priya Sharma',
    title: 'Senior ICU Charge Nurse (Staff)',
    id: 'stf-204',
    badge: 'NS',
    tenantName: 'AIIMS Super Specialty Hospital',
    route: '/staff',
    permissions: ['staff:grading:write', 'staff:shifts:read', 'hospital:beds:read'],
  },
  doctor: {
    role: 'doctor',
    name: 'Dr. Rajesh Kumar',
    title: 'Chief Medical Officer / HOD Surgery',
    id: 'doc-502',
    badge: 'DR',
    tenantName: 'AIIMS Super Specialty Hospital',
    route: '/doctor',
    permissions: ['emr:opd:operate', 'emr:triage:execute', 'emr:prescribe:write'],
  },
  admin: {
    role: 'admin',
    name: 'Dr. Meera Mehta',
    title: 'Dean of Academic & Hospital Affairs',
    id: 'adm-301',
    badge: 'DE',
    tenantName: 'AIIMS Medical College & Hospital Governance',
    route: '/admin',
    permissions: ['admin:revenue:read', 'admin:nmc:report', 'admin:compliance:audit'],
  },
  billing: {
    role: 'billing',
    name: 'Suresh Verma',
    title: 'Hospital Finance & GST Billing Admin',
    id: 'fin-409',
    badge: 'FA',
    tenantName: 'AIIMS Super Specialty Hospital Billing',
    route: '/billing',
    permissions: ['billing:invoices:create', 'billing:pos:collect', 'billing:gst:export'],
  },
  pharmacy: {
    role: 'pharmacy',
    name: 'Kavita Patel',
    title: 'Chief Pharmacist & LIS Diagnostics Manager',
    id: 'phr-112',
    badge: 'KP',
    tenantName: 'AIIMS Pharmacy & LIS Diagnostics',
    route: '/pharmacy',
    permissions: ['pharmacy:dispense:write', 'pharmacy:inventory:manage', 'lis:lab:verify'],
  },
  'super-admin': {
    role: 'super-admin',
    name: 'System Root Admin',
    title: 'Global Enterprise SaaS Super Admin',
    id: 'root-001',
    badge: 'SA',
    tenantName: 'PLUX MAX SaaS Global Master Control',
    route: '/super-admin',
    permissions: ['*:*'],
  },
};

interface RBACContextType {
  currentRole: UserRoleProfile;
  switchRole: (role: RoleType) => void;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Infer initial role based on current route path
  const getInitialRole = (): UserRoleProfile => {
    if (pathname.includes('/student')) return ROLE_PROFILES.student;
    if (pathname.includes('/staff')) return ROLE_PROFILES.staff;
    if (pathname.includes('/doctor')) return ROLE_PROFILES.doctor;
    if (pathname.includes('/admin')) return ROLE_PROFILES.admin;
    if (pathname.includes('/billing')) return ROLE_PROFILES.billing;
    if (pathname.includes('/pharmacy')) return ROLE_PROFILES.pharmacy;
    if (pathname.includes('/super-admin')) return ROLE_PROFILES['super-admin'];
    return ROLE_PROFILES.student;
  };

  const [currentRole, setCurrentRole] = useState<UserRoleProfile>(getInitialRole);

  const switchRole = (roleKey: RoleType) => {
    const profile = ROLE_PROFILES[roleKey];
    if (profile) {
      setCurrentRole(profile);
      router.push(profile.route);
    }
  };

  return (
    <RBACContext.Provider value={{ currentRole, switchRole }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};
