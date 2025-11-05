
export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',
}

export interface FoodItem {
  id: number;
  description: string;
  calories: number;
  type: MealType;
}

export interface Workout {
  id: number;
  description: string;
  caloriesBurned: number;
}
