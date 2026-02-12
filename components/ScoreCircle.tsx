
import React from 'react';

interface ScoreCircleProps {
  score: number;
  grade: string;
  status: string;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, grade, status }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getStatusColor = () => {
    if (score >= 90) return 'stroke-green-500';
    if (score >= 80) return 'stroke-indigo-500';
    if (score >= 70) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Background track */}
        <circle
          className="text-slate-100 stroke-current"
          strokeWidth="12"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
        />
        {/* Progress track */}
        <circle
          className={`${getStatusColor()} score-circle transition-all duration-1000 ease-out stroke-current`}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
        <span className="text-4xl font-extrabold text-slate-900">{Math.round(score)}%</span>
        <span className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{grade} GRADE</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
