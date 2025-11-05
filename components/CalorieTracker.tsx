
import React from 'react';

interface CalorieTrackerProps {
  consumed: number;
  goal: number;
}

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ consumed, goal }) => {
  const percentage = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0;
  const radius = 80;
  const strokeWidth = 15;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const remaining = Math.max(0, goal - consumed);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="relative w-48 h-48">
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 200 200"
          className="transform -rotate-90"
        >
          <circle
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-700"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius + strokeWidth/2}
            cy={radius + strokeWidth/2}
          />
          <circle
            stroke="currentColor"
            className="text-emerald-500"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius + strokeWidth/2}
            cy={radius + strokeWidth/2}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
            {consumed.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">Consumed</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
            {remaining.toLocaleString()} kcal remaining
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Goal: {goal.toLocaleString()} kcal</p>
      </div>
    </div>
  );
};

export default CalorieTracker;
