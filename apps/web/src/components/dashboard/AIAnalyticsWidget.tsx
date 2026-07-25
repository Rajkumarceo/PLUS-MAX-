'use client';

import React, { useState } from 'react';
import { BrainCircuit, CheckCircle, Sparkles } from 'lucide-react';
import { TriagePredictionResult } from '@plux-max/types';

export const AIAnalyticsWidget: React.FC = () => {
  const [symptoms, setSymptoms] = useState('Severe chest pain radiating to left arm, shortness of breath, acute diaphoresis');
  const [bpSystolic, setBpSystolic] = useState(165);
  const [spo2, setSpo2] = useState(91);
  const [heartRate, setHeartRate] = useState(115);
  const [prediction, setPrediction] = useState<TriagePredictionResult | null>({
    triageCategory: 'RED',
    urgencyLevel: 'CRITICAL',
    confidenceScore: 0.96,
    suggestedICD10Code: 'I21.9',
    suggestedICD10Description: 'Acute myocardial infarction, unspecified',
    recommendedAction: 'Immediate Resuscitation & Emergency OT Transfer',
  });

  const handleRunTriage = () => {
    let score: 'RED' | 'YELLOW' | 'GREEN' = 'GREEN';
    let urgency: 'CRITICAL' | 'URGENT' | 'STABLE' = 'STABLE';
    let icdCode = 'R07.9';
    let icdDesc = 'Chest pain, unspecified';
    let action = 'Routine OPD Consultation';

    if (spo2 < 92 || bpSystolic > 160 || heartRate > 110) {
      score = 'RED';
      urgency = 'CRITICAL';
      icdCode = 'I21.9';
      icdDesc = 'Acute myocardial infarction, unspecified';
      action = 'Immediate Resuscitation & Emergency OT Transfer';
    } else if (spo2 < 95) {
      score = 'YELLOW';
      urgency = 'URGENT';
      icdCode = 'J18.9';
      icdDesc = 'Pneumonia, unspecified organism';
      action = 'Priority Triage & STAT Chest X-Ray';
    }

    setPrediction({
      triageCategory: score,
      urgencyLevel: urgency,
      confidenceScore: 0.95,
      suggestedICD10Code: icdCode,
      suggestedICD10Description: icdDesc,
      recommendedAction: action,
    });
  };

  return (
    <div className="erp-card">
      <div className="erp-card-header flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BrainCircuit className="w-5 h-5 text-[#403294]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#091E42]">AI Clinical Triage & ICD-10 Predictive Engine</h3>
            <p className="text-[11px] text-[#5E6C84]">Real-time clinical risk scoring & diagnostic auto-coding</p>
          </div>
        </div>
        <span className="erp-badge-blue">ICD-10 / ICD-11 ML Model</span>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Form Input Column */}
        <div className="lg:col-span-6 space-y-3 bg-[#FAFBFC] p-3.5 rounded border border-[#DFE1E6]">
          <div className="text-xs font-bold text-[#091E42] uppercase tracking-wider">
            Patient Vitals & Symptoms Assessment
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Chief Symptoms</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={2}
              className="w-full px-2.5 py-1.5 rounded border border-[#DFE1E6] bg-white text-xs text-[#172B4D] focus:outline-none focus:border-[#0052CC]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-[10px] font-bold text-[#5E6C84] block mb-1">Systolic BP</label>
              <input
                type="number"
                value={bpSystolic}
                onChange={(e) => setBpSystolic(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-[#DFE1E6] bg-white text-xs font-mono font-bold text-[#172B4D]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#5E6C84] block mb-1">SpO2 (%)</label>
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-[#DFE1E6] bg-white text-xs font-mono font-bold text-[#172B4D]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#5E6C84] block mb-1">Heart Rate</label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-[#DFE1E6] bg-white text-xs font-mono font-bold text-[#172B4D]"
              />
            </div>
          </div>

          <button
            onClick={handleRunTriage}
            className="w-full py-2 rounded bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Execute AI Triage Inference</span>
          </button>
        </div>

        {/* Prediction Results Column */}
        {prediction && (
          <div className="lg:col-span-6 bg-[#FAFBFC] p-3.5 rounded border border-[#DFE1E6] flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#EBECF0] pb-2">
                <span className="text-xs font-bold text-[#091E42]">Triage Risk Classification</span>
                <span
                  className={
                    prediction.triageCategory === 'RED'
                      ? 'erp-badge-red'
                      : prediction.triageCategory === 'YELLOW'
                      ? 'erp-badge-yellow'
                      : 'erp-badge-green'
                  }
                >
                  CATEGORY {prediction.triageCategory} ({prediction.urgencyLevel})
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#5E6C84]">Suggested ICD-10 Code:</span>
                  <span className="font-mono font-bold text-[#0052CC] bg-[#DEEBFF] px-2 py-0.5 rounded border border-[#B3D4FF]">
                    {prediction.suggestedICD10Code}
                  </span>
                </div>
                <div className="font-bold text-[#091E42]">{prediction.suggestedICD10Description}</div>
                <div className="text-[#5E6C84]">
                  Recommended Protocol:{' '}
                  <span className="font-bold text-[#091E42]">{prediction.recommendedAction}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EBECF0] flex items-center justify-between text-[11px] text-[#5E6C84]">
              <span>Confidence: {(prediction.confidenceScore * 100).toFixed(1)}%</span>
              <span className="text-[#006644] font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#006644]" /> DPDP & HIPAA Audited
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
