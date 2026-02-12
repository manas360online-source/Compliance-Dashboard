
export type AlertLevel = 'critical' | 'warning' | 'info';

export interface ComplianceAlert {
  id: number;
  level: AlertLevel;
  category: string;
  title: string;
  message: string;
  createdAt: string;
  isResolved: boolean;
}

export interface AreaScores {
  dpdpa: number;
  nmc: number;
  mha: number;
  it_act: number;
  documents: number;
}

export interface ComplianceScores {
  overall_score: number;
  grade: string;
  status: 'excellent' | 'good' | 'acceptable' | 'needs_improvement' | 'critical';
  areas: AreaScores;
}

export interface DetailedMetrics {
  dpdpa: {
    total_users: number;
    users_with_valid_consent: number;
    consent_coverage_pct: number;
    pending_deletions: number;
    completed_deletions: number;
    data_breach_incidents: number;
  };
  nmc: {
    total_therapists: number;
    verified_therapists: number;
    verification_pct: number;
    total_sessions: number;
    sessions_with_consent: number;
  };
  documents: {
    required: number;
    available: number;
    expiring_soon: number;
    expired: number;
  };
}
