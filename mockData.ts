
import { ComplianceScores, ComplianceAlert, DetailedMetrics } from './types';

export const mockScores: ComplianceScores = {
  overall_score: 92.4,
  grade: 'A',
  status: 'excellent',
  areas: {
    dpdpa: 94.5,
    nmc: 88.0,
    mha: 95.0,
    it_act: 100.0,
    documents: 85.0
  }
};

export const mockAlerts: ComplianceAlert[] = [
  {
    id: 1,
    level: 'critical',
    category: 'pending_deletion',
    title: '3 DPDPA Deletions Overdue',
    message: 'User data deletions are past their 30-day scheduled date. Execute immediately to avoid ₹250 Cr penalties.',
    createdAt: new Date().toISOString(),
    isResolved: false
  },
  {
    id: 2,
    level: 'warning',
    category: 'document_expiry',
    title: '5 Documents Expiring in 7 Days',
    message: 'Key institutional agreements with TPAs are nearing expiration. Renewal process recommended.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isResolved: false
  },
  {
    id: 3,
    level: 'info',
    category: 'it_act',
    title: 'Digital Signature Batch Verified',
    message: 'Integrity checks passed for 1,200 electronic medical records (EMR).',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isResolved: true
  }
];

export const mockDetailedMetrics: DetailedMetrics = {
  dpdpa: {
    total_users: 15400,
    users_with_valid_consent: 14630,
    consent_coverage_pct: 95,
    pending_deletions: 12,
    completed_deletions: 145,
    data_breach_incidents: 0
  },
  nmc: {
    total_therapists: 85,
    verified_therapists: 82,
    verification_pct: 96.4,
    total_sessions: 4200,
    sessions_with_consent: 4150
  },
  documents: {
    required: 20,
    available: 17,
    expiring_soon: 5,
    expired: 0
  }
};
