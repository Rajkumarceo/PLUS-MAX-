'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Wifi,
  CheckCircle2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Cpu,
  Receipt,
  DollarSign,
} from 'lucide-react';

export interface POSTransaction {
  id: string;
  terminalId: string;
  patientName: string;
  amount: number;
  paymentMethod: 'CHIP_CARD' | 'CONTACTLESS_NFC' | 'UPI_QR';
  tokenHash: string;
  status: 'SUCCESS' | 'PENDING';
  timestamp: string;
}

const INITIAL_TRANSACTIONS: POSTransaction[] = [
  { id: 'tx-8901', terminalId: 'RZP-POS-MUM-01', patientName: 'Savitri Devi', amount: 15000, paymentMethod: 'CHIP_CARD', tokenHash: 'tok_rzp_98210a4b7c', status: 'SUCCESS', timestamp: '10:14 AM' },
  { id: 'tx-8902', terminalId: 'RZP-POS-MUM-01', patientName: 'Rajesh Shinde', amount: 4200, paymentMethod: 'CONTACTLESS_NFC', tokenHash: 'tok_rzp_77189c2d1e', status: 'SUCCESS', timestamp: '10:28 AM' },
];

export const RazorpayPOSTerminal: React.FC = () => {
  const [terminalState, setTerminalState] = useState<'IDLE' | 'TERMINAL_READY' | 'CARD_READING' | 'PIN_VERIFIED' | 'PAYMENT_SUCCESS'>('IDLE');
  const [chargeAmount, setChargeAmount] = useState(8500);
  const [patientName, setPatientName] = useState('Anil Kumar (UHID-9812)');
  const [transactions, setTransactions] = useState<POSTransaction[]>(INITIAL_TRANSACTIONS);
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  const handleStartPOSPayment = () => {
    setTerminalState('TERMINAL_READY');
  };

  const handleSimulateTapCard = () => {
    setTerminalState('CARD_READING');
    setTimeout(() => {
      setTerminalState('PIN_VERIFIED');
      setTimeout(() => {
        const token = `tok_rzp_${Math.floor(10000 + Math.random() * 90000)}a${Math.floor(100 + Math.random() * 900)}`;
        setCurrentToken(token);
        setTerminalState('PAYMENT_SUCCESS');

        const newTx: POSTransaction = {
          id: `tx-${Math.floor(8000 + Math.random() * 1000)}`,
          terminalId: 'RZP-POS-MUM-01',
          patientName,
          amount: chargeAmount,
          paymentMethod: 'CONTACTLESS_NFC',
          tokenHash: token,
          status: 'SUCCESS',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setTransactions([newTx, ...transactions]);
      }, 1500);
    }, 1500);
  };

  const resetTerminal = () => {
    setTerminalState('IDLE');
    setCurrentToken(null);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Razorpay Smart POS Terminal Bridge</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  Hardware API Linked
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Physical Terminal API Sync • Real-Time Accounting Ledger Update • PCI-DSS Encrypted Tokenization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-400/30 text-emerald-200 text-xs font-bold">
            <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Terminal RZP-POS-MUM-01 Online</span>
          </div>
        </div>
      </div>

      {/* HARDWARE SIMULATOR & TRANSACTION LEDGER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: PHYSICAL SMART POS TERMINAL SIMULATOR */}
        <div className="lg:col-span-5 p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-black uppercase text-slate-900">Razorpay Smart POS Terminal Screen</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">FW v4.12.0</span>
          </div>

          {/* POS Hardware Screen Device Rendering */}
          <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-4 shadow-2xl border-2 border-slate-800 text-center relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-mono">ID: RZP-POS-MUM-01</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Wifi className="w-3 h-3" /> CONNECTED
              </span>
            </div>

            {terminalState === 'IDLE' && (
              <div className="py-6 space-y-3">
                <div className="text-xs font-extrabold text-slate-400">READY FOR CHARGE</div>
                <div className="text-2xl font-black text-white">₹{chargeAmount.toLocaleString('en-IN')}</div>
                <button
                  onClick={handleStartPOSPayment}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg transition-all"
                >
                  Send Payment Request to Terminal
                </button>
              </div>
            )}

            {terminalState === 'TERMINAL_READY' && (
              <div className="py-6 space-y-3 animate-in zoom-in-95">
                <div className="text-xs font-extrabold text-blue-300">INSERT / TAP CARD OR SCAN QR</div>
                <div className="text-2xl font-black text-white">₹{chargeAmount.toLocaleString('en-IN')}</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/40 animate-pulse">
                  <CreditCard className="w-8 h-8" />
                </div>
                <button
                  onClick={handleSimulateTapCard}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all"
                >
                  Simulate Patient Card Tap / Dip
                </button>
              </div>
            )}

            {terminalState === 'CARD_READING' && (
              <div className="py-8 space-y-3">
                <RefreshCw className="w-8 h-8 mx-auto text-blue-400 animate-spin" />
                <div className="text-xs font-black text-blue-300">Reading EMV Chip & PCI Tokenizing...</div>
              </div>
            )}

            {terminalState === 'PIN_VERIFIED' && (
              <div className="py-8 space-y-3">
                <Lock className="w-8 h-8 mx-auto text-amber-400 animate-bounce" />
                <div className="text-xs font-black text-amber-300">4-Digit PIN Verified. Settling Ledger...</div>
              </div>
            )}

            {terminalState === 'PAYMENT_SUCCESS' && (
              <div className="py-6 space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <div className="text-sm font-black text-emerald-300">PAYMENT CLEARED SUCCESSFULLY!</div>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                  PCI Token: {currentToken}
                </div>
                <button
                  onClick={resetTerminal}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Reset Terminal for Next Patient
                </button>
              </div>
            )}
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-blue-900">Encrypted Tokenization Active</div>
            <p className="text-[11px] text-slate-600">Card numbers are never stored in plain text. Conforms to PCI-DSS v4.0.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME SYNCED ACCOUNTING LEDGER */}
        <div className="lg:col-span-7 p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Real-Time Synced POS Accounting Ledger</h3>
              <p className="text-xs text-slate-500">Automated front-desk collection synchronization.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-black">
              Zero Reconciliation Errors
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Tx ID & Terminal</th>
                  <th>Patient Name</th>
                  <th>Amount (INR)</th>
                  <th>Encrypted PCI Token</th>
                  <th>Sync Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="font-mono text-xs font-extrabold text-blue-700">
                      <div>{tx.id}</div>
                      <div className="text-[10px] text-slate-500">{tx.terminalId}</div>
                    </td>
                    <td className="font-extrabold text-slate-900 text-xs">{tx.patientName}</td>
                    <td className="font-mono font-black text-slate-900 text-xs">₹{tx.amount.toLocaleString('en-IN')}</td>
                    <td className="font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                        {tx.tokenHash}
                      </span>
                    </td>
                    <td>
                      <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Synced to ERP
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
