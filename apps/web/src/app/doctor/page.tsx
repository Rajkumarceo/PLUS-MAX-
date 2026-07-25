'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { DoctorDashboardView } from '@/components/dashboard/DoctorDashboardView';

export default function DoctorPortalPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <DoctorDashboardView />
        </main>
      </div>
    </div>
  );
}
