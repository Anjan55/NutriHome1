import { Chef, Dish } from './data/chefs.ts';

export type { Chef, Dish };

export interface CartItem {
  dish: Dish;
  chef: Chef;
  quantity: number;
  planType: 'single' | 'weekly';
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  weightKg: number;
  heightCm: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'keto' | 'senior_health';
  dietaryPreference: 'all' | 'veg' | 'non-veg' | 'vegan' | 'keto';
  calculatedTDEE?: number;
  targetCalories?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFat?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  matchedChefId?: string | null;
  timestamp: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalProtein: number;
  totalCalories: number;
  deliverySlot: string;
  deliveryAddress: string;
  dietaryNote: string;
  createdAt: string;
  status: 'confirmed' | 'kitchen_prepping' | 'out_for_delivery' | 'delivered';
}
