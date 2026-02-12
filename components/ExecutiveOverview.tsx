
import React, { useState } from 'react';
import { ComplianceScores } from '../types';
import ScoreCircle from './ScoreCircle';
import AreaScoreCard from './AreaScoreCard';

interface ExecutiveOverviewProps {
  scores: ComplianceScores;
  onDownload: () => void;
}

const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ scores, onDownload }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportComplete(false);
    
    // Simulate report generation delay
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      onDownload(); // Trigger the original prop for tracking/alerts
      
      // Reset success state after a delay
      setTimeout(() => setExportComplete(false), 5000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {exportComplete && (
        <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl flex items-center justify-between shadow-lg shadow-indigo-200 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-semibold text-sm">Executive Compliance Report (PDF) downloaded successfully.</span>
          </div>
          <button onClick={() => setExportComplete(false)} className="text-indigo-200 hover:text-white font-bold text-xs uppercase">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Executive Overview</h2>
          <p className="text-slate-500 mt-1">Key metrics for board-level reporting and regulatory posture.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95 min-w-[180px] ${
            isExporting 
              ? 'bg-slate-100 text-slate-400 cursor-wait' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
          }`}
        >
          {isExporting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export Report
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Overall Adherence</h3>
            <ScoreCircle score={scores.overall_score} grade={scores.grade} status={scores.status} />
            <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Status</p>
                <p className="text-slate-800 font-bold capitalize text-sm">{scores.status.replace('_', ' ')}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Grade</p>
                <p className="text-slate-800 font-bold text-sm">{scores.grade}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl text-white">
            <h4 className="font-bold text-md mb-3">Priority Objectives</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-slate-300">DPDPA Privacy Seal</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-slate-300">NMC Documentation Batch 4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-lg text-slate-800 px-1">Compliance Area Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AreaScoreCard title="DPDPA 2023" score={scores.areas.dpdpa} weight={30} color="indigo" />
            <AreaScoreCard title="NMC Telemedicine" score={scores.areas.nmc} weight={25} color="blue" />
            <AreaScoreCard title="Mental Health Act" score={scores.areas.mha} weight={20} color="teal" />
            <AreaScoreCard title="IT Act 2000" score={scores.areas.it_act} weight={15} color="emerald" />
            <AreaScoreCard title="Document Coverage" score={scores.areas.documents} weight={10} color="slate" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;
