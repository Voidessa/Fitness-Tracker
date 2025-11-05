
import React, { useState, useMemo } from 'react';
import { FoodItem, Workout, MealType } from './types';
import { DAILY_CALORIE_GOAL } from './constants';
import Dashboard from './components/Dashboard';
import AddMealModal from './components/AddMealModal';
import AddWorkoutModal from './components/AddWorkoutModal';
import { PlusIcon } from './components/IconComponents';

export default function App() {
  const [meals, setMeals] = useState<FoodItem[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const totalCaloriesConsumed = useMemo(() => {
    return meals.reduce((sum, item) => sum + item.calories, 0);
  }, [meals]);

  const totalCaloriesBurned = useMemo(() => {
    return workouts.reduce((sum, item) => sum + item.caloriesBurned, 0);
  }, [workouts]);

  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

  const addMeal = (meal: { description: string; calories: number; type: MealType }) => {
    const newMeal: FoodItem = {
      id: Date.now(),
      ...meal,
    };
    setMeals([...meals, newMeal]);
  };

  const addWorkout = (workout: { description: string; caloriesBurned: number }) => {
    const newWorkout: Workout = {
      id: Date.now(),
      ...workout,
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const mealsByType = (type: MealType) => meals.filter(m => m.type === type);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <header className="bg-white dark:bg-slate-950/70 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Gemini <span className="text-emerald-500">Fitness Pal</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your AI-powered daily calorie and workout tracker.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard
          totalCaloriesConsumed={totalCaloriesConsumed}
          totalCaloriesBurned={totalCaloriesBurned}
          netCalories={netCalories}
          calorieGoal={DAILY_CALORIE_GOAL}
          onAddMeal={() => setIsMealModalOpen(true)}
          onAddWorkout={() => setIsWorkoutModalOpen(true)}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Today's Meals</h2>
            {meals.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No meals logged yet. <button onClick={() => setIsMealModalOpen(true)} className="text-emerald-500 hover:text-emerald-400 font-semibold">Add one!</button></p>
            ) : (
              <div className="space-y-4">
                {Object.values(MealType).map(type => {
                  const currentMeals = mealsByType(type);
                  if (currentMeals.length === 0) return null;
                  return (
                    <div key={type}>
                      <h3 className="font-semibold text-emerald-500 capitalize">{type}</h3>
                      <ul className="mt-2 space-y-2">
                        {currentMeals.map(meal => (
                          <li key={meal.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-100 dark:bg-slate-700/50">
                            <span>{meal.description}</span>
                            <span className="font-medium text-slate-600 dark:text-slate-300">{meal.calories} kcal</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Today's Workouts</h2>
            {workouts.length === 0 ? (
               <p className="text-slate-500 dark:text-slate-400">No workouts logged yet. <button onClick={() => setIsWorkoutModalOpen(true)} className="text-emerald-500 hover:text-emerald-400 font-semibold">Add one!</button></p>
            ) : (
              <ul className="space-y-2">
                {workouts.map(workout => (
                  <li key={workout.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-100 dark:bg-slate-700/50">
                    <span>{workout.description}</span>
                    <span className="font-medium text-red-500">{workout.caloriesBurned} kcal</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 sm:hidden">
        <button
          onClick={() => setIsWorkoutModalOpen(true)}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-110"
          aria-label="Add Workout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </button>
        <button
          onClick={() => setIsMealModalOpen(true)}
          className="bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-110"
          aria-label="Add Meal"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      <AddMealModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        onAddMeal={addMeal}
      />
      <AddWorkoutModal
        isOpen={isWorkoutModalOpen}
        onClose={() => setIsWorkoutModalOpen(false)}
        onAddWorkout={addWorkout}
      />
    </div>
  );
}
