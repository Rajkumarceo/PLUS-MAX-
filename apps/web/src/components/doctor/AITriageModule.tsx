'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Activity,
  CheckCircle,
  AlertCircle,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Plus,
  RefreshCw,
  Sliders,
  Layers,
  Heart,
  Brain,
  Stethoscope,
} from 'lucide-react';

export interface AnatomicalRegion {
  id: string;
  name: string;
  icdCode: string;
  icdDescription: string;
  differentialDiagnosis: string[];
  suggestedLabs: string[];
  acuity: 'CRITICAL' | 'URGENT' | 'STABLE';
  esiLevel: number;
}

const REGIONS: AnatomicalRegion[] = [
  {
    id: 'chest',
    name: 'Chest & Cardiovascular (Heart / Lungs)',
    icdCode: 'I21.9',
    icdDescription: 'Acute myocardial infarction, unspecified / Acute Coronary Syndrome',
    differentialDiagnosis: ['Acute Myocardial Infarction', 'Aortic Dissection', 'Pulmonary Embolism', 'Unstable Angina'],
    suggestedLabs: ['STAT Serum Troponin-I', '12-Lead Electrocardiogram (ECG)', 'D-Dimer Quantitative', 'Arterial Blood Gas (ABG)', 'STAT Chest X-Ray PA View'],
    acuity: 'CRITICAL',
    esiLevel: 1,
  },
  {
    id: 'brain',
    name: 'Head & Central Nervous System (Brain / Cerebrovascular)',
    icdCode: 'I63.9',
    icdDescription: 'Cerebral infarction, unspecified / Acute Ischemic Stroke',
    differentialDiagnosis: ['Acute Ischemic Stroke', 'Subarachnoid Hemorrhage', 'Transient Ischemia (TIA)', 'Acute Meningitis'],
    suggestedLabs: ['STAT Non-Contrast Brain CT', 'MRI Brain Stroke Protocol', 'Serum Electrolytes', 'Blood Glucose STAT', 'Coagulation Profile (PT/INR)'],
    acuity: 'CRITICAL',
    esiLevel: 2,
  },
  {
    id: 'abdomen',
    name: 'Abdomen & GI Tract (Appendix / Gallbladder)',
    icdCode: 'K35.8',
    icdDescription: 'Acute appendicitis, other and unspecified',
    differentialDiagnosis: ['Acute Appendicitis', 'Acute Cholecystitis', 'Perforated Peptic Ulcer', 'Acute Pancreatitis'],
    suggestedLabs: ['Ultrasound Abdomen & Pelvis', 'Complete Blood Count (CBC) with DLC', 'Serum Amylase & Lipase', 'C-Reactive Protein (CRP)', 'LFT Panel'],
    acuity: 'URGENT',
    esiLevel: 3,
  },
  {
    id: 'spine',
    name: 'Spine & Musculoskeletal',
    icdCode: 'M54.5',
    icdDescription: 'Low back pain, lumbago with sciatica',
    differentialDiagnosis: ['Lumbar Disc Herniation', 'Vertebral Compression Fracture', 'Acute Lumbar Strain'],
    suggestedLabs: ['Lumbar Spine X-Ray AP/Lateral', 'MRI Lumbar Spine', 'ESR & CRP'],
    acuity: 'STABLE',
    esiLevel: 4,
  },
];

export const AITriageModule: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<AnatomicalRegion>(REGIONS[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [orderedLabs, setOrderedLabs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // WebGPU / Canvas 3D Rendering simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render3DAnatomy = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 1.2;

      // Draw futuristic WebGPU wireframe grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw 3D Human Figure outline with metallic glow
      ctx.save();
      ctx.translate(centerX, centerY);
      const rad = (rotationAngle * Math.PI) / 180;
      const perspectiveScale = Math.cos(rad);

      // Head
      ctx.beginPath();
      ctx.arc(0, -110, 24 * (0.9 + Math.abs(perspectiveScale) * 0.1), 0, Math.PI * 2);
      ctx.fillStyle = selectedRegion.id === 'brain' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.2)';
      ctx.strokeStyle = selectedRegion.id === 'brain' ? '#EF4444' : '#3B82F6';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      // Torso / Chest
      ctx.beginPath();
      ctx.ellipse(0, -30, 45 * Math.abs(perspectiveScale) + 10, 55, 0, 0, Math.PI * 2);
      ctx.fillStyle = selectedRegion.id === 'chest' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.15)';
      ctx.strokeStyle = selectedRegion.id === 'chest' ? '#EF4444' : '#3B82F6';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      // Abdomen
      ctx.beginPath();
      ctx.ellipse(0, 40, 38 * Math.abs(perspectiveScale) + 8, 40, 0, 0, Math.PI * 2);
      ctx.fillStyle = selectedRegion.id === 'abdomen' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(59, 130, 246, 0.15)';
      ctx.strokeStyle = selectedRegion.id === 'abdomen' ? '#F59E0B' : '#3B82F6';
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();

      // Spine Line
      ctx.beginPath();
      ctx.moveTo(0, -80);
      ctx.lineTo(0, 80);
      ctx.strokeStyle = selectedRegion.id === 'spine' ? '#10B981' : 'rgba(148, 163, 184, 0.5)';
      ctx.lineWidth = selectedRegion.id === 'spine' ? 4 : 2;
      ctx.stroke();

      // Pulsing Node Highlight
      const now = Date.now() / 300;
      const pulseRadius = 8 + Math.sin(now) * 3;

      let nodeY = -30;
      if (selectedRegion.id === 'brain') nodeY = -110;
      if (selectedRegion.id === 'abdomen') nodeY = 40;
      if (selectedRegion.id === 'spine') nodeY = 10;

      ctx.beginPath();
      ctx.arc(0, nodeY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#EF4444';
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 15;
      ctx.fill();

      ctx.restore();

      if (isRotating) {
        setRotationAngle((prev) => (prev + 1.5) % 360);
      }

      animationFrameId = requestAnimationFrame(render3DAnatomy);
    };

    render3DAnatomy();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotationAngle, isRotating, selectedRegion]);

  const togglePreOrderLab = (lab: string) => {
    setOrderedLabs((prev) =>
      prev.includes(lab) ? prev.filter((l) => l !== lab) : [...prev, lab]
    );
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner backdrop-blur-md">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">AI Clinical Triage & 3D Spatial Anatomy</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-500/30 text-purple-200 border border-purple-400/40">
                  WebGPU Hardware Accelerated
                </span>
              </div>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Interactive 360° Anatomical Modeling • ESI Acuity Scoring • Predictive Lab Pre-Orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">Acuity ESI Level</div>
              <div className="text-lg font-black text-red-400">LEVEL {selectedRegion.esiLevel} (CRITICAL)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas & Diagnostic Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: WEBGPU 3D ANATOMICAL MODEL CANVAS */}
        <div className="lg:col-span-5 p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-black uppercase text-slate-800">3D WebGPU Spatial Anatomical Viewport</h3>
            </div>
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isRotating ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>{isRotating ? 'Auto Rotating' : 'Rotate 360°'}</span>
            </button>
          </div>

          {/* 3D Canvas rendering container */}
          <div className="relative h-80 bg-slate-950 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-slate-800">
            <canvas ref={canvasRef} width={380} height={320} className="w-full h-full object-contain cursor-grab" />

            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 text-[10px] font-mono text-purple-300">
              WebGPU Engine: Active (60 FPS)
            </div>
          </div>

          {/* Region Selection Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-800 block">Select Anatomical Target Region</label>
            <div className="grid grid-cols-2 gap-2">
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedRegion.id === reg.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI DIFFERENTIAL DIAGNOSIS & PREDICTIVE LAB PRE-ORDERS */}
        <div className="lg:col-span-7 space-y-5">
          {/* AI Correlated ICD-10 & Acuity Result */}
          <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">AI Inference Result</span>
                <h3 className="text-base font-black text-slate-900">{selectedRegion.name}</h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  selectedRegion.acuity === 'CRITICAL'
                    ? 'bg-red-100 text-red-800 border border-red-200 shadow-sm'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                ESI LEVEL {selectedRegion.esiLevel} ({selectedRegion.acuity})
              </span>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-600">Primary Suggested ICD-10:</span>
                <span className="font-mono font-black text-purple-900 bg-white px-2 py-0.5 rounded border border-purple-200">
                  {selectedRegion.icdCode}
                </span>
              </div>
              <p className="font-bold text-purple-950 text-sm">{selectedRegion.icdDescription}</p>
            </div>

            {/* Differential Diagnoses List */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Correlated Differential Diagnoses
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
                {selectedRegion.differentialDiagnosis.map((diag, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span>{diag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PREDICTIVE LAB SUGGESTIONS & 1-CLICK PRE-ORDERS */}
          <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-600" />
                  <span>Predictive Diagnostic Lab & Imaging Pre-Orders</span>
                </h3>
                <p className="text-xs text-slate-500">Order statistically likely panels before patient enters consultation room.</p>
              </div>
              {orderedLabs.length > 0 && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-black">
                  {orderedLabs.length} Pre-Ordered
                </span>
              )}
            </div>

            <div className="space-y-2">
              {selectedRegion.suggestedLabs.map((lab) => {
                const isOrdered = orderedLabs.includes(lab);

                return (
                  <div
                    key={lab}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isOrdered ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900">{lab}</span>
                    <button
                      onClick={() => togglePreOrderLab(lab)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isOrdered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                      }`}
                    >
                      {isOrdered ? <CheckCircle className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{isOrdered ? 'Pre-Ordered' : 'Pre-Order STAT'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
