import type { Metadata } from 'next';
import './globals.css';
import { StudentEvaluationProvider } from '@/context/StudentEvaluationContext';
import { RBACProvider } from '@/context/RBACContext';

export const metadata: Metadata = {
  title: 'PLUX MAX | Enterprise Hospital & Medical College Unified ERP System',
  description:
    'Massive multi-tenant ERP platform integrating 25 modules across healthcare management, medical college administration, billing, diagnostics, and AI predictive analytics.',
  keywords: [
    'Hospital ERP',
    'Medical College ERP',
    'AI Hospital Triage',
    'NMC Compliant ERP',
    'NABH Healthcare Software',
    'PLUX MAX',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 min-h-screen font-sans antialiased overflow-x-hidden">
        <StudentEvaluationProvider>
          <RBACProvider>{children}</RBACProvider>
        </StudentEvaluationProvider>
      </body>
    </html>
  );
}
