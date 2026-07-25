'use client';

import React, { useState } from 'react';
import { ShieldAlert, Building2, Plus, X } from 'lucide-react';

export const SuperAdminTenantWidget: React.FC = () => {
  const [tenants, setTenants] = useState([
    {
      id: 't-1',
      name: 'AIIMS Super Specialty Hospital & College',
      code: 'aiims-delhi',
      domain: 'aiims.pluxmax.com',
      status: 'ACTIVE',
      plan: 'ENTERPRISE_FULL',
      beds: 1500,
      students: 2000,
    },
    {
      id: 't-2',
      name: 'Apollo Hospital & Health Sciences',
      code: 'apollo-hyderabad',
      domain: 'apollo.pluxmax.com',
      status: 'ACTIVE',
      plan: 'ENTERPRISE_FULL',
      beds: 800,
      students: 1000,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantCode, setNewTenantCode] = useState('');

  const handleAddTenant = () => {
    if (!newTenantName || !newTenantCode) return;
    const newT = {
      id: `t-${Date.now()}`,
      name: newTenantName,
      code: newTenantCode,
      domain: `${newTenantCode}.pluxmax.com`,
      status: 'ACTIVE',
      plan: 'ENTERPRISE_FULL',
      beds: 500,
      students: 500,
    };
    setTenants((prev) => [newT, ...prev]);
    setNewTenantName('');
    setNewTenantCode('');
    setShowModal(false);
  };

  return (
    <div className="erp-card">
      <div className="erp-card-header flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-[#0052CC]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#091E42]">Super Admin Multi-Tenant Provisioner</h3>
            <p className="text-[11px] text-[#5E6C84]">Tenant isolation, domain binding & enterprise SaaS licensing</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1 rounded bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Provision Tenant</span>
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="p-3.5 rounded bg-[#FAFBFC] border border-[#DFE1E6] space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0052CC]" />
                <div>
                  <h4 className="text-xs font-bold text-[#091E42]">{tenant.name}</h4>
                  <p className="text-[11px] font-mono text-[#0052CC]">{tenant.domain}</p>
                </div>
              </div>
              <span className="erp-badge-green">{tenant.status}</span>
            </div>

            <div className="pt-2 border-t border-[#EBECF0] grid grid-cols-2 gap-2 text-xs text-[#5E6C84]">
              <div>
                Licensed Beds: <span className="font-bold text-[#091E42]">{tenant.beds}</span>
              </div>
              <div>
                Licensed Students: <span className="font-bold text-[#091E42]">{tenant.students}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#091E42]/60 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-lg max-w-md w-full border border-[#DFE1E6] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#EBECF0] pb-2">
              <h4 className="text-sm font-extrabold text-[#091E42]">Provision Enterprise Hospital Tenant</h4>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#5E6C84] hover:bg-[#F4F5F7] rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#172B4D] block mb-1">Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Manipal Super Specialty Hospital"
                  value={newTenantName}
                  onChange={(e) => setNewTenantName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-[#DFE1E6] bg-[#FAFBFC] text-xs text-[#172B4D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#172B4D] block mb-1">Subdomain Code</label>
                <input
                  type="text"
                  placeholder="e.g. manipal-hospital"
                  value={newTenantCode}
                  onChange={(e) => setNewTenantCode(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-[#DFE1E6] bg-[#FAFBFC] text-xs text-[#172B4D]"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded bg-[#F4F5F7] border border-[#DFE1E6] text-xs font-bold text-[#172B4D]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTenant}
                className="px-3 py-1.5 rounded bg-[#0052CC] text-xs font-bold text-white shadow-sm"
              >
                Provision Tenant Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
