
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ExecutiveOverview from './components/ExecutiveOverview';
import AlertPanel from './components/AlertPanel';
import DetailedMetricsSection from './components/DetailedMetricsSection';
import AuditReports from './components/AuditReports';
import { mockScores, mockAlerts, mockDetailedMetrics } from './mockData';
import { ComplianceScores, ComplianceAlert, DetailedMetrics } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  const [scores] = useState<ComplianceScores>(mockScores);
  const [alerts] = useState<ComplianceAlert[]>(mockAlerts);
  const [metrics] = useState<DetailedMetrics>(mockDetailedMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const downloadCertificate = () => {
    alert("Generating Compliance Report PDF...\nReference ID: COMP-20241027-EXT");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-medium animate-pulse">Establishing Secure Session...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <ExecutiveOverview scores={scores} onDownload={downloadCertificate} />;
      case 'alerts':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-900">Risk Management</h2>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Clear All Resolved</button>
            </div>
            <AlertPanel alerts={alerts} />
          </div>
        );
      case 'metrics':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900">Detailed Performance</h2>
            <DetailedMetricsSection metrics={metrics} />
          </div>
        );
      case 'audit':
        return <AuditReports />;
      default:
        return <ExecutiveOverview scores={scores} onDownload={downloadCertificate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm font-medium">Compliance Center</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 text-sm font-bold capitalize">{activeView.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-500 uppercase">Live Monitoring Active</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>

        <footer className="px-8 py-6 border-t border-slate-200 text-slate-400 text-xs flex justify-between items-center">
          <div>© 2024 Manas360 Private Limited. Advanced Governance Module v1.2</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Help Desk</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
