
import React, { useState, useEffect } from 'react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  status: 'Completed' | 'Failed';
  type: string;
}

const AuditReports: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);
  const [auditHistory, setAuditHistory] = useState<AuditLogEntry[]>([]);

  const handleScheduleAudit = () => {
    setIsAuditing(true);
    setAuditSuccess(false);
    setAuditProgress(0);
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isAuditing) {
      interval = window.setInterval(() => {
        setAuditProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAuditing(false);
            setAuditSuccess(true);
            
            // Add to history
            const newEntry: AuditLogEntry = {
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date().toLocaleString(),
              status: 'Completed',
              type: 'Manual Request'
            };
            setAuditHistory(prevHistory => [newEntry, ...prevHistory]);
            
            return 100;
          }
          return prev + 4; // Slightly faster for better UX
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAuditing]);

  const handleViewPolicy = () => {
    setShowPolicyModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Audit Reports</h2>
          <p className="text-slate-500 text-sm mt-1">Manage governance logs and statutory compliance evidence.</p>
        </div>
        <button className="text-sm font-bold text-slate-400 cursor-not-allowed flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download Archive
        </button>
      </div>

      {auditSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center justify-between animate-in zoom-in duration-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <span className="font-semibold text-sm">Manual Audit Cycle Complete. Records updated in the activity log.</span>
          </div>
          <button onClick={() => setAuditSuccess(false)} className="text-emerald-600 hover:text-emerald-800 font-bold text-xs uppercase tracking-wider">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Audit Trigger Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-12 text-center shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            {isAuditing && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all duration-300 ease-out" style={{ width: `${auditProgress}%` }}></div>
              </div>
            )}
            
            <div className="max-w-sm">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-500 transform rotate-6 border border-indigo-100 shadow-inner">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Governance Engine Idle</h3>
              <p className="text-slate-500 leading-relaxed mb-10 text-sm">
                Next automated snapshot scheduled for the end of the current 30-day compliance cycle. 
                You may trigger a manual reconciliation for interim reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleScheduleAudit}
                  disabled={isAuditing}
                  className={`px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 ${isAuditing ? 'opacity-75 cursor-wait' : 'active:scale-95'}`}
                >
                  {isAuditing ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Scanning... {auditProgress}%
                    </>
                  ) : 'Trigger Manual Audit'}
                </button>
                <button 
                  onClick={handleViewPolicy}
                  className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                >
                  Policy Framework
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Log History */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Recent Activity</h4>
              <span className="bg-indigo-50 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{auditHistory.length} SESSIONS</span>
            </div>

            {auditHistory.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-slate-50 border-dashed rounded-2xl">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-slate-400 text-xs font-medium">No manual logs detected in this session.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                {auditHistory.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">{log.type}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${log.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mb-1">Session {log.id}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Policy Modal Overlay */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowPolicyModal(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Audit Policy v2.1</h3>
                <p className="text-slate-500 text-sm mt-1">Official Governance & Compliance Protocol</p>
              </div>
              <button onClick={() => setShowPolicyModal(false)} className="text-slate-400 hover:text-slate-600 p-2 bg-slate-50 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="space-y-6 text-slate-700">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs border border-indigo-100">01</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Automated Reconciliation</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Continuous monitoring tracks every consent event and data deletion request in real-time, locking logs for monthly review.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs border border-indigo-100">02</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Regulatory Mapping</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Evidence is automatically mapped against DPDPA 2023, NMC Telemedicine Guidelines, and Mental Health Act requirements.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs border border-indigo-100">03</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Immutable Storage</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Finalized audit reports are cryptographically signed and stored in Indian-sovereign cold storage for a mandatory 7-year period.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowPolicyModal(false)}
              className="w-full mt-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
            >
              Acknowledged Framework
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditReports;
