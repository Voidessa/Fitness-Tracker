
import React, { useState, Fragment } from 'react';
import { MealType } from '../types';
import { getCalorieInfo } from '../services/geminiService';
import Loader from './Loader';
import { XIcon } from './IconComponents';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: { description: string; calories: number; type: MealType }) => void;
}

const AddMealModal: React.FC<AddMealModalProps> = ({ isOpen, onClose, onAddMeal }) => {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState<number | ''>('');
  const [mealType, setMealType] = useState<MealType>(MealType.Breakfast);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCalories = async () => {
    if (!description) {
      setError('Please enter a food description.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const estimatedCalories = await getCalorieInfo(description);
      setCalories(estimatedCalories);
    } catch (err) {
      setError('Could not estimate calories. Please enter manually.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && calories !== '' && calories > 0) {
      onAddMeal({ description, calories, type: mealType });
      // Reset form
      setDescription('');
      setCalories('');
      setMealType(MealType.Breakfast);
      setError(null);
      onClose();
    } else {
      setError('Please fill out all fields with valid values.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add a Meal</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Food Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., 2 eggs, 1 slice of toast, 1 apple"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Calories (kcal)
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="number"
                  id="calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                  placeholder="e.g., 350"
                  className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleGetCalories}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                >
                  {isLoading ? <Loader /> : 'Ask Gemini'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="mealType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Meal Type
              </label>
              <select
                id="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              >
                {Object.values(MealType).map(type => (
                  <option key={type} value={type} className="capitalize">{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800"
              >
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMealModal;
