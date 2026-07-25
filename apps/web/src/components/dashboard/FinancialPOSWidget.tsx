'use client';

import React, { useState } from 'react';
import { DollarSign, Receipt, CheckCircle2 } from 'lucide-react';

export const FinancialPOSWidget: React.FC = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'inv-9001',
      invoiceNumber: 'INV-2026-0091',
      patientName: 'Aarav Sharma (UHID-9081)',
      totalAmount: 18500,
      gstAmount: 3330,
      paidAmount: 18500,
      status: 'PAID',
      mode: 'RAZORPAY_UPI',
    },
    {
      id: 'inv-9002',
      invoiceNumber: 'INV-2026-0092',
      patientName: 'Priya Verma (UHID-9082)',
      totalAmount: 4200,
      gstAmount: 756,
      paidAmount: 0,
      status: 'UNPAID',
      mode: 'PENDING',
    },
  ]);

  const handleSimulatePayment = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, paidAmount: inv.totalAmount, status: 'PAID', mode: 'POS_CARD' }
          : inv,
      ),
    );
  };

  return (
    <div className="erp-card">
      <div className="erp-card-header flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <DollarSign className="w-5 h-5 text-[#006644]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#091E42]">Financial ERP & POS Billing Terminal</h3>
            <p className="text-[11px] text-[#5E6C84]">GST tax invoices, Razorpay POS integration & ledger tracking</p>
          </div>
        </div>

        <button className="px-3 py-1 rounded bg-[#006644] hover:bg-[#004D33] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
          <Receipt className="w-3.5 h-3.5" />
          <span>New 18% GST Invoice</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="erp-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Patient / UHID</th>
              <th>Total (Inc 18% GST)</th>
              <th>Status</th>
              <th className="text-right">Collection Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="font-mono text-[#0052CC] font-bold">{inv.invoiceNumber}</td>
                <td className="font-bold text-[#091E42]">{inv.patientName}</td>
                <td className="font-mono font-bold text-[#091E42]">
                  ₹{inv.totalAmount.toLocaleString('en-IN')}{' '}
                  <span className="text-[10px] text-[#5E6C84] font-normal">(GST ₹{inv.gstAmount})</span>
                </td>
                <td>
                  <span className={inv.status === 'PAID' ? 'erp-badge-green' : 'erp-badge-red'}>
                    {inv.status}
                  </span>
                </td>
                <td className="text-right">
                  {inv.status === 'UNPAID' ? (
                    <button
                      onClick={() => handleSimulatePayment(inv.id)}
                      className="px-2.5 py-1 rounded bg-[#006644] hover:bg-[#004D33] text-white font-bold text-xs transition-all shadow-sm"
                    >
                      Collect ₹{inv.totalAmount} (POS)
                    </button>
                  ) : (
                    <span className="text-[#006644] font-bold text-xs flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006644]" /> Paid ({inv.mode})
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
