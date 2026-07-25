# PLUS MAX Enterprise Hospital & Medical College Unified ERP
## Complete Software Architecture Specification & Deep Research Document

---

### Executive Summary
**PLUS MAX** is an enterprise-grade, multi-tenant software platform designed specifically for medical colleges, super-specialty hospitals, healthcare networks, and single-specialty clinics. The system integrates clinical care, medical student competency tracking, financial ledgers, diagnostics automation, supply chain, and multi-tenant SaaS governance into a zero-latency web interface.

---

## 1. System Architecture & Tech Stack

- **Frontend Core**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Framer Motion
- **Spatial 3D & Graphics Engine**: WebGPU, WebGL 2.0 Canvas Renderer
- **API Backend**: NestJS (TypeScript), REST & WebSocket Microservices
- **Multi-Tenant Database Layer**: PostgreSQL with Isolated Schema Architecture (`tenant_schema_*`)
- **Compliance & Security**: NMC 2,683 Competencies, ABDM (Ayushman Bharat Digital Mission), NABH Audit, DPDP Act (Data Protection), PCI-DSS Tokenization, Let's Encrypt TLS 1.3

---

## 2. Core Functional Modules Breakdown

### 🎓 1. Student Portal (Medical College)
1. **My NMC e-Logbook**: Searchable table tracking 2,683 mandatory NMC competencies with Knowledge (K), Know How (KH), Show How (SH), and Perform (P) domain tags. Includes DOAP, AETCOM, FAP forms, and faculty sign-offs.
2. **My Attendance & IA 40%**: SVG radial progress rings for theory (≥75%) and practical attendance, real-time IA score grid, and <40% exam eligibility alerts.
3. **My Clinical Postings**: Rotation spatial calendar with ward details and clinical procedure log submission.
4. **My Fees & Hostel**: Itemized dues, checkout modal with downloadable PDF receipt generator, hostel room allocation, mess card tracking, and digital QR gate pass generator.

---

### 🩺 2. Staff & Faculty Portal
1. **Faculty Logbook E-Sign Desk**: Inbox view of student submissions filterable by batch/ward, batch PIN digital signatures, slide-out frosted glass review modal, and immutable ledger.
2. **IA Marks Gradebook**: Spreadsheet-style grid with locked left columns, statistical overlays, red <40% highlights, and HOD PIN 9999 freeze lock.
3. **Ward Attendance**: Touch-optimized quick-toggle roster, 360-degree spatial ward map, and automated absentee triggers.
4. **Shift Roster**: Duty timeline, shift swap marketplace, and leave management portal.

---

### 👨‍⚕️ 3. Doctor EMR & Clinical Portal
1. **OPD Consult Queue**: Frosted glass smart patient cards, zero-click vitals hover snapshot, and dynamic flow swimlanes.
2. **AI Clinical Triage & 3D Anatomy**: Rotatable 3D anatomical human body model (WebGPU canvas) with organ nodes, ESI acuity scoring (Critical/Urgent/Stable), and predictive STAT lab pre-orders.
3. **OT Surgery Schedule**: 360-degree spatial theater floor map (OT 1-4 statuses), Gantt timeline with auto prep/cleanup buffers, and surgical team conflict matrix.
4. **Prescription Writer**: Specialty-ranked drug search, hard-stop allergy/interaction guardrails with safe alternatives, 1-tap regimen protocols, and SHA-256 digital pharmacy hand-off.

---

### 💳 4. Financial ERP & POS Terminal
1. **18% GST Invoices**: Automated SAC code tax routing (SAC 9993 0% Healthcare vs SAC 9997 18% Cosmetic), CGST/SGST vs IGST calculation engine, and compliant credit notes.
2. **Razorpay POS Terminal**: Physical POS hardware sync simulator, real-time ledger updates, and PCI-DSS card tokenization (`tok_rzp_*`).
3. **Insurance TPA Pre-auth**: TPA provider integrations (Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Medi Assist), digital pre-auth packaging, emergency cashless bypass, and automated discharge packets.
4. **Patient Billing**: Zero-latency master folio charge ingestion, pre-discharge review dashboard, and multi-modal split payment handling.

---

### 💊 5. Pharmacy & LIS Diagnostics Module
1. **Medicine Stock Inventory**: High-density SKU data grid, frosted amber reorder glows (`QOH < Par Level`), and multi-store inter-department transfers.
2. **Barcode Dispenser**: Simulated 2D barcode scanner, metallic blue match verification highlight, and hard-stop discrepancy warning alerts.
3. **Batch Expiry Tracker**: 30/60/90 day timeline clustering, FEFO (First-Expire First-Out) enforcement, and reverse PO vendor return routing.
4. **LIS Lab Verification**: Bi-directional analyzer sync (Sysmex & Roche), split-screen validation UI, and automated pathologist anomaly flagging.

---

### 🛡️ 6. Super Admin SaaS Command Center
1. **Tenant Provisioner**: 1-Click onboarding wizard, isolated PostgreSQL schema generation (`tenant_schema_*`), and automated ICD-10 seed data injection.
2. **Domain Binding**: CNAME/A record DNS visualizer with metallic blue status glow, zero-touch SSL auto-provisioning (Let's Encrypt TLS 1.3), and tenant reverse proxy gateway.
3. **Bed Quota Licensing**: SVG capacity radial progress rings, soft 90% frosted amber & hard 100% admission block enforcement, and feature flag toggles.
4. **Global System Logs**: WebGPU infinite-scroll telemetry log grid, real-time AI threat highlighting in red glass panels, and granular query builder.

---

## 3. Vercel Deployment Guide

### Option A: Vercel GitHub Deployment (Recommended)
1. Push repository changes to GitHub: `https://github.com/Rajkumarceo/PLUS-MAX-.git`
2. Log into [Vercel Dashboard](https://vercel.com).
3. Click **Add New Project** -> Select `Rajkumarceo/PLUS-MAX-`.
4. Set Framework Preset: `Next.js`, Root Directory: `apps/web`.
5. Click **Deploy**. Vercel will build and assign a global HTTPS production URL.

### Option B: Vercel CLI Terminal Command
```bash
# 1. Login to Vercel CLI
npx vercel login

# 2. Deploy Project to Production
npx vercel --prod
```

---

## 4. PDF Document Access
- **Printable HTML Document**: [http://localhost:3000/software_documentation.html](http://localhost:3000/software_documentation.html)
- Click the **Download / Print Complete PDF Document** button at the top of the page to save as a PDF file.
