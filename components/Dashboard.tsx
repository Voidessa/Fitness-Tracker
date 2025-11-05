
import React from 'react';
import CalorieTracker from './CalorieTracker';
import { PlusIcon } from './IconComponents';

interface DashboardProps {
  totalCaloriesConsumed: number;
  totalCaloriesBurned: number;
  netCalories: number;
  calorieGoal: number;
  onAddMeal: () => void;
  onAddWorkout: () => void;
}

const StatCard: React.FC<{ title: string; value: number; unit: string; colorClass: string }> = ({ title, value, unit, colorClass }) => (
  <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center">
    <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value.toLocaleString()}</p>
    <p className="text-xs text-slate-400 dark:text-slate-500">{unit}</p>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({
  totalCaloriesConsumed,
  totalCaloriesBurned,
  netCalories,
  calorieGoal,
  onAddMeal,
  onAddWorkout,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <CalorieTracker
          consumed={totalCaloriesConsumed}
          goal={calorieGoal}
        />
        <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-4 flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-1 w-full gap-4">
               <StatCard title="Burned" value={totalCaloriesBurned} unit="kcal" colorClass="text-red-500" />
               <StatCard title="Net" value={netCalories} unit="kcal" colorClass="text-blue-500" />
            </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md flex flex-col justify-center items-center space-y-4">
        <h2 className="text-lg font-semibold text-center">Log Your Activity</h2>
        <button
          onClick={onAddMeal}
          className="w-full flex items-center justify-center bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Meal
        </button>
        <button
          onClick={onAddWorkout}
          className="w-full flex items-center justify-center bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Add Workout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
