
import React from 'react';
import { DetailedMetrics } from '../types';

interface DetailedMetricsSectionProps {
  metrics: DetailedMetrics;
}

const DetailedMetricsSection: React.FC<DetailedMetricsSectionProps> = ({ metrics }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-slate-800">Detailed Compliance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* DPDPA Metrics */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <h4 className="font-extrabold text-indigo-600 text-sm uppercase tracking-widest mb-4">DPDPA 2023</h4>
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Consent Coverage</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.dpdpa.consent_coverage_pct}%</span>
                  <span className="text-slate-400 text-xs mb-1">({metrics.dpdpa.users_with_valid_consent} / {metrics.dpdpa.total_users})</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Pending Deletions</p>
                  <p className={`text-xl font-black ${metrics.dpdpa.pending_deletions > 0 ? 'text-amber-500' : 'text-slate-800'}`}>{metrics.dpdpa.pending_deletions}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Data Breaches</p>
                  <p className={`text-xl font-black ${metrics.dpdpa.data_breach_incidents > 0 ? 'text-red-500' : 'text-green-500'}`}>{metrics.dpdpa.data_breach_incidents}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NMC Metrics */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <h4 className="font-extrabold text-blue-600 text-sm uppercase tracking-widest mb-4">NMC Guidelines</h4>
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Practitioner Verification</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-slate-800">{metrics.nmc.verification_pct}%</span>
                  <span className="text-slate-400 text-xs mb-1">({metrics.nmc.verified_therapists} / {metrics.nmc.total_therapists})</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Sessions with Consent</p>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-black text-slate-800">{Math.round((metrics.nmc.sessions_with_consent / metrics.nmc.total_sessions) * 100)}%</span>
                  <span className="text-slate-400 text-xs mb-0.5">({metrics.nmc.sessions_with_consent} sessions)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Coverage */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12"></div>
          <div className="relative">
            <h4 className="font-extrabold text-slate-600 text-sm uppercase tracking-widest mb-4">Document Coverage</h4>
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Policy Availability</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-slate-800">{Math.round((metrics.documents.available / metrics.documents.required) * 100)}%</span>
                  <span className="text-slate-400 text-xs mb-1">({metrics.documents.available} / {metrics.documents.required})</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Expiring Soon</p>
                  <p className="text-xl font-black text-amber-500">{metrics.documents.expiring_soon}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Expired (Active)</p>
                  <p className={`text-xl font-black ${metrics.documents.expired > 0 ? 'text-red-600' : 'text-green-500'}`}>{metrics.documents.expired}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMetricsSection;
