
import React from 'react';
import { ComplianceAlert } from '../types';

interface AlertPanelProps {
  alerts: ComplianceAlert[];
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const critical = alerts.filter(a => a.level === 'critical');
  const warning = alerts.filter(a => a.level === 'warning');
  const info = alerts.filter(a => a.level === 'info');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-800">Compliance Risk Alerts</h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{alerts.length} Total</span>
      </div>
      
      <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
        {critical.map(alert => (
          <div key={alert.id} className="p-4 bg-red-50 flex gap-4 animate-in slide-in-from-right duration-300">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-red-700 font-bold text-sm uppercase">Critical Risk</span>
                <span className="text-slate-400 text-xs">• {new Date(alert.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-slate-900 font-bold text-sm mt-0.5">{alert.title}</p>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{alert.message}</p>
            </div>
          </div>
        ))}

        {warning.map(alert => (
          <div key={alert.id} className="p-4 bg-amber-50 flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 font-bold text-sm uppercase">Action Required</span>
                <span className="text-slate-400 text-xs">• {new Date(alert.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-slate-900 font-bold text-sm mt-0.5">{alert.title}</p>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{alert.message}</p>
            </div>
          </div>
        ))}

        {info.map(alert => (
          <div key={alert.id} className="p-4 flex gap-4 opacity-75">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700 font-bold text-sm uppercase">Info</span>
              </div>
              <p className="text-slate-900 font-bold text-sm mt-0.5">{alert.title}</p>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;
