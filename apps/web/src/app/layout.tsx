import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { StudentEvaluationProvider } from '@/context/StudentEvaluationContext';
import { RBACProvider } from '@/context/RBACContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Titanobova Private Limited | Enterprise Healthcare & Medical SaaS ERP',
  description:
    'State-of-the-art enterprise software suite for Titanobova Private Limited integrating High-Density Data Grids, Student Portal, Doctor EMR, Pharmacy LIS, Financial POS, and Super Admin SaaS.',
  keywords: [
    'Titanobova Private Limited',
    'Titanobova ERP',
    'Hospital ERP',
    'Medical College ERP',
    'AI Hospital Triage',
    'WebGPU Spatial EMR',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased overflow-x-hidden">
        <StudentEvaluationProvider>
          <RBACProvider>{children}</RBACProvider>
        </StudentEvaluationProvider>
      </body>
    </html>
  );
}
