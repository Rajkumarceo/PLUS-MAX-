'use client';

import React from 'react';
import { Bed, ArrowUpRight } from 'lucide-react';

export const HospitalBedsWidget: React.FC = () => {
  const wards = [
    {
      id: 'w-1',
      name: 'ICU Block A (Cardiology)',
      type: 'ICU',
      totalBeds: 20,
      occupiedBeds: 17,
      availableBeds: 3,
      occupancyRate: 85,
    },
    {
      id: 'w-2',
      name: 'General Surgery Ward 3',
      type: 'General',
      totalBeds: 50,
      occupiedBeds: 38,
      availableBeds: 12,
      occupancyRate: 76,
    },
    {
      id: 'w-3',
      name: 'Neurology OT Recovery',
      type: 'OT',
      totalBeds: 15,
      occupiedBeds: 6,
      availableBeds: 9,
      occupancyRate: 40,
    },
    {
      id: 'w-4',
      name: 'Pediatric Care Unit',
      type: 'Pediatric',
      totalBeds: 30,
      occupiedBeds: 28,
      availableBeds: 2,
      occupancyRate: 93,
    },
  ];

  return (
    <div className="erp-card">
      <div className="erp-card-header flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Bed className="w-5 h-5 text-[#0052CC]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#091E42]">Live Ward & ICU Bed Matrix</h3>
            <p className="text-[11px] text-[#5E6C84]">Real-time hospital bed allocation & occupancy monitoring</p>
          </div>
        </div>

        <button className="px-3 py-1 rounded bg-[#0052CC] text-white text-xs font-bold hover:bg-[#0747A6] transition-colors flex items-center gap-1">
          <span>Admit Patient</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {wards.map((ward) => (
          <div key={ward.id} className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6] space-y-2.5">
            <div className="flex justify-between items-start">
              <div>
                <span className="erp-badge-blue">{ward.type}</span>
                <h4 className="text-xs font-bold text-[#091E42] mt-1">{ward.name}</h4>
              </div>
              <span
                className={
                  ward.occupancyRate > 90
                    ? 'erp-badge-red'
                    : ward.occupancyRate > 75
                    ? 'erp-badge-yellow'
                    : 'erp-badge-green'
                }
              >
                {ward.occupancyRate}% Occupied
              </span>
            </div>

            <div className="space-y-1">
              <div className="w-full bg-[#EBECF0] h-2 rounded overflow-hidden">
                <div
                  className={`h-full rounded ${
                    ward.occupancyRate > 90
                      ? 'bg-[#DE350B]'
                      : ward.occupancyRate > 75
                      ? 'bg-[#FFAB00]'
                      : 'bg-[#008DA6]'
                  }`}
                  style={{ width: `${ward.occupancyRate}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#5E6C84]">
                <span>Occupied: {ward.occupiedBeds}</span>
                <span className="font-bold text-[#0052CC]">Available: {ward.availableBeds}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
