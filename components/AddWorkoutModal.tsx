
import React, { useState } from 'react';
import { getWorkoutCalories } from '../services/geminiService';
import Loader from './Loader';
import { XIcon } from './IconComponents';

interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorkout: (workout: { description: string; caloriesBurned: number }) => void;
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({ isOpen, onClose, onAddWorkout }) => {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCalories = async () => {
    if (!description) {
      setError('Please enter a workout description.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const estimatedCalories = await getWorkoutCalories(description);
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
      onAddWorkout({ description, caloriesBurned: calories });
      // Reset form
      setDescription('');
      setCalories('');
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
            <h2 className="text-xl font-bold">Add a Workout</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="workout-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Workout Description
              </label>
              <input
                type="text"
                id="workout-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., 30 minute run, weightlifting"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="workout-calories" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Calories Burned (kcal)
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="number"
                  id="workout-calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                  placeholder="e.g., 250"
                  className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleGetCalories}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                >
                  {isLoading ? <Loader /> : 'Ask Gemini'}
                </button>
              </div>
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
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800"
              >
                Add Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
