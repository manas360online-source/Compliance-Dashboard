
import React from 'react';

interface AreaScoreCardProps {
  title: string;
  score: number;
  weight: number;
  color: 'indigo' | 'blue' | 'teal' | 'emerald' | 'slate';
}

const AreaScoreCard: React.FC<AreaScoreCardProps> = ({ title, score, weight, color }) => {
  const colorMap = {
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    teal: 'bg-teal-600',
    emerald: 'bg-emerald-600',
    slate: 'bg-slate-600',
  };

  const lightColorMap = {
    indigo: 'bg-indigo-50',
    blue: 'bg-blue-50',
    teal: 'bg-teal-50',
    emerald: 'bg-emerald-50',
    slate: 'bg-slate-50',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</h4>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mt-1">Weight: {weight}%</p>
        </div>
        <span className="text-lg font-black text-slate-900">{score.toFixed(1)}%</span>
      </div>
      <div className={`w-full h-3 ${lightColorMap[color]} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${colorMap[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default AreaScoreCard;
