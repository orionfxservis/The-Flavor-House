export type DietaryFlag =
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo'
  | 'high-protein'
  | 'plant-based'
  | 'low-sodium'
  | 'nut-free';

export type MealCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snacks';

export interface MealAddon {
  id: string;
  name: string;
  price: number;
  calories?: number;
}

export interface NutritionalMacros {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber?: number;
  sodium?: number; // in mg
}

export interface MealItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: MealCategory;
  subcategory?: string;
  price: number;
  image: string;
  macros: NutritionalMacros;
  nutritionVerified?: boolean;
  tags: DietaryFlag[];
  ingredients: string[];
  allergens: string[];
  addons?: MealAddon[];
  chefNote?: string;
  heatingInstructions?: string;
  badge?: string;
  available?: boolean;
}

export interface CustomizationOption {
  portion: 'standard' | 'athlete' | 'regular' | 'large' | 'extra';
  carbSwap: 'original' | 'cauliflower-rice' | 'sweet-potato' | 'jasmine-rice' | 'extra-greens';
  sauceOption: 'standard' | 'extra' | 'on-the-side' | 'light';
  dietaryExclusions: string[];
  addons?: { id: string; name: string; price: number }[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  meal: MealItem;
  quantity: number;
  customization: CustomizationOption;
  unitPrice: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  mealsPerWeek: number;
  pricePerMeal: number;
  weeklyTotal: number;
  tagline: string;
  features: string[];
  popular?: boolean;
}

export type DeliveryFrequency = 'weekly' | 'bi-weekly' | 'monthly';
export type DeliveryDay = 'Sunday' | 'Tuesday' | 'Thursday';

export interface UserSubscription {
  id: string;
  planId: string;
  status: 'active' | 'paused' | 'skipped';
  frequency: DeliveryFrequency;
  deliveryDay: DeliveryDay;
  nextDeliveryDate: string;
  nextBillingDate: string;
  selectedMealsCount: number;
  totalMealsInPlan: number;
  pausedUntilDate?: string;
}

export type OrderMilestone =
  | 'confirmed'
  | 'chef-prepping'
  | 'quality-checked'
  | 'in-transit'
  | 'delivered';

export interface DeliveryTracking {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: OrderMilestone;
  estimatedDeliveryWindow: string;
  transitTemperature: number; // e.g. 36.2 F
  driverName: string;
  driverPhone: string;
  driverVehicle: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  timeline: {
    time: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'delivery' | 'promotion' | 'subscription';
  read: boolean;
  actionUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  verified: boolean;
  createdAt: string;
}

export interface SavedAccount {
  email: string;
  passwordHash: string; // password stored for client session authentication
  name: string;
  phone?: string;
  verified: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  image: string;
  status?: 'approved' | 'pending';
}
