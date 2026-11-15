import React, { useState } from 'react';
import { X, Check, Plus, AlertCircle, Sparkles } from 'lucide-react';
import { MealItem, CustomizationOption } from '../types/meal';

interface MealCustomizerModalProps {
  meal: MealItem | null;
  onClose: () => void;
  onAddToCart: (meal: MealItem, customization: CustomizationOption, finalPrice: number) => void;
}

export const MealCustomizerModal: React.FC<MealCustomizerModalProps> = ({
  meal,
  onClose,
  onAddToCart
}) => {
  if (!meal) return null;

  const [portion, setPortion] = useState<'standard' | 'athlete'>('standard');
  const [carbSwap, setCarbSwap] = useState<'original' | 'cauliflower-rice' | 'sweet-potato' | 'jasmine-rice' | 'extra-greens'>('original');
  const [sauceOption, setSauceOption] = useState<'standard' | 'extra' | 'on-the-side' | 'light'>('standard');
  const [dietaryExclusions, setDietaryExclusions] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate pricing based on options
  let priceAdjustment = 0;
  if (portion === 'athlete') priceAdjustment += 3.50;
  if (carbSwap === 'cauliflower-rice') priceAdjustment += 1.00;
  if (carbSwap === 'sweet-potato') priceAdjustment += 0.50;
  if (sauceOption === 'extra') priceAdjustment += 0.75;

  const finalUnitPrice = meal.price + priceAdjustment;

  // Calculate dynamic macros based on options
  const baseMacros = meal.macros;
  let dynamicCalories = baseMacros.calories;
  let dynamicProtein = baseMacros.protein;
  let dynamicCarbs = baseMacros.carbs;
  let dynamicFat = baseMacros.fat;

  if (portion === 'athlete') {
    dynamicProtein += Math.round(baseMacros.protein * 0.4);
    dynamicCalories += 130;
    dynamicFat += 4;
  }

  if (carbSwap === 'cauliflower-rice') {
    dynamicCarbs = Math.max(8, dynamicCarbs - 20);
    dynamicCalories -= 80;
  } else if (carbSwap === 'extra-greens') {
    dynamicCarbs = Math.max(6, dynamicCarbs - 22);
    dynamicCalories -= 90;
  } else if (carbSwap === 'sweet-potato') {
    dynamicCarbs += 6;
    dynamicCalories += 25;
  }

  const toggleExclusion = (tag: string) => {
    if (dietaryExclusions.includes(tag)) {
      setDietaryExclusions(dietaryExclusions.filter((t) => t !== tag));
    } else {
      setDietaryExclusions([...dietaryExclusions, tag]);
    }
  };

  const handleConfirm = () => {
    const custom: CustomizationOption = {
      portion,
      carbSwap,
      sauceOption,
      dietaryExclusions,
      specialInstructions: specialInstructions.trim() || undefined
    };
    onAddToCart(meal, custom, finalUnitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden my-8">
        
        {/* Header with image preview banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              Chef Customization Suite
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
              {meal.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-1">
              {meal.subtitle}
            </p>
          </div>
        </div>

        {/* Dynamic Macros Bar */}
        <div className="bg-stone-100 dark:bg-stone-800/60 px-6 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 sm:gap-6 tabular-numbers">
            <div>
              <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Calories</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{dynamicCalories} kcal</span>
            </div>
            <div>
              <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Protein</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{dynamicProtein}g</span>
            </div>
            <div>
              <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Carbs</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{dynamicCarbs}g</span>
            </div>
            <div>
              <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Fats</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">{dynamicFat}g</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Estimated Price</span>
            <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base tabular-numbers">
              ${finalUnitPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Customization Controls Form */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Section 1: Portion Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              1. Select Portion Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPortion('standard')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  portion === 'standard'
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 text-stone-900 dark:text-stone-100 ring-1 ring-amber-600'
                    : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Standard Chef Portion</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Included</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Balanced macro ratio tailored for lean maintenance
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPortion('athlete')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  portion === 'athlete'
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 text-stone-900 dark:text-stone-100 ring-1 ring-amber-600'
                    : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold flex items-center gap-1.5">
                    Athlete Upgrade
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  </span>
                  <span className="text-xs font-semibold text-amber-600">+$3.50</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  +40% Extra Lean Protein (approx +16g-20g protein)
                </p>
              </button>
            </div>
          </div>

          {/* Section 2: Clean Carb / Base Swap */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              2. Clean Carb & Base Selection
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'original', name: 'Chef Original Base', extra: 0, desc: 'As crafted on weekly menu' },
                { id: 'cauliflower-rice', name: 'Riced Cauliflower (Keto)', extra: 1.00, desc: 'Ultra-low carb (only 6g net carbs)' },
                { id: 'sweet-potato', name: 'Roasted Garnet Sweet Potato', extra: 0.50, desc: 'Complex low-glycemic carb' },
                { id: 'jasmine-rice', name: 'Organic Steamed Jasmine Rice', extra: 0, desc: 'Clean, easily digestible fuel' },
                { id: 'extra-greens', name: 'Extra Seasonal Greens (No Starch)', extra: 0, desc: 'Double French beans & broccolini' },
              ].map((swap) => (
                <button
                  key={swap.id}
                  type="button"
                  onClick={() => setCarbSwap(swap.id as any)}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    carbSwap === swap.id
                      ? 'border-amber-600 bg-amber-50/40 dark:bg-amber-950/20 ring-1 ring-amber-600'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block">
                      {swap.name}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      {swap.desc}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-stone-600 dark:text-stone-300 shrink-0 ml-2">
                    {swap.extra === 0 ? 'Free' : `+$${swap.extra.toFixed(2)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Chef Sauce Handling */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              3. Chef Sauce & Dressing
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'standard', name: 'Standard Plated' },
                { id: 'on-the-side', name: 'Sauce on Side' },
                { id: 'light', name: 'Light Sauce' },
                { id: 'extra', name: 'Extra Sauce (+$0.75)' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSauceOption(s.id as any)}
                  className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer ${
                    sauceOption === s.id
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Dietary Exclusions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              4. Dietary & Allergen Exclusions
            </label>
            <div className="flex flex-wrap gap-2">
              {['Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Low Sodium', 'No Alliums / Garlic'].map((exc) => {
                const isSelected = dietaryExclusions.includes(exc);
                return (
                  <button
                    key={exc}
                    type="button"
                    onClick={() => toggleExclusion(exc)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{exc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Chef Kitchen Note */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
              Special Chef Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Crisp well-done salmon skin, dressing in ramekin"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-6 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 block">Total Meal Price</span>
            <span className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
              ${finalUnitPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Add Customized Meal to Box
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
