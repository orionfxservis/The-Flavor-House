import React, { useState, useEffect } from 'react';
import { X, Check, Plus, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';
import { MealItem, CustomizationOption, DietaryFlag } from '../types/meal';

interface MealCustomizerModalProps {
  meal: MealItem | null;
  onClose: () => void;
  onAddToCart: (meal: MealItem, customization: CustomizationOption, finalPrice: number) => void;
}

const DIETARY_DISPLAY: Partial<Record<DietaryFlag, string>> = {
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  'gluten-free': 'Gluten-Free',
  'dairy-free': 'Dairy-Free',
  'high-protein': 'High-Protein',
  keto: 'Keto',
  paleo: 'Paleo',
  'plant-based': 'Plant-Based',
  'low-sodium': 'Low-Sodium',
  'nut-free': 'Nut-Free'
};

export const MealCustomizerModal: React.FC<MealCustomizerModalProps> = ({
  meal,
  onClose,
  onAddToCart
}) => {
  const [portion, setPortion] = useState<'standard' | 'athlete'>('standard');
  const [carbSwap, setCarbSwap] = useState<'original' | 'cauliflower-rice' | 'sweet-potato' | 'jasmine-rice' | 'extra-greens'>('original');
  const [sauceOption, setSauceOption] = useState<'standard' | 'extra' | 'on-the-side' | 'light'>('standard');
  const [dietaryExclusions, setDietaryExclusions] = useState<string[]>([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    setPortion('standard');
    setCarbSwap('original');
    setSauceOption('standard');
    setDietaryExclusions([]);
    setSelectedAddonIds([]);
    setSpecialInstructions('');
  }, [meal?.id]);

  if (!meal) return null;

  const isSnackOrBev = meal.category === 'snacks';
  const availableAddons = meal.addons ?? [];
  const chosenAddons = availableAddons.filter((a) => selectedAddonIds.includes(a.id));

  // Calculate dynamic pricing
  let priceAdjustment = chosenAddons.reduce((sum, a) => sum + a.price, 0);
  if (!isSnackOrBev && portion === 'athlete') priceAdjustment += 3.50;
  if (!isSnackOrBev && carbSwap === 'cauliflower-rice') priceAdjustment += 1.00;
  if (!isSnackOrBev && carbSwap === 'sweet-potato') priceAdjustment += 0.50;
  if (!isSnackOrBev && sauceOption === 'extra') priceAdjustment += 0.75;

  const finalUnitPrice = meal.price + priceAdjustment;

  // Calculate dynamic verified macros
  const baseMacros = meal.macros;
  let dynamicCalories =
    baseMacros.calories +
    chosenAddons.reduce((sum, a) => sum + (a.calories || 0), 0);
  let dynamicProtein = baseMacros.protein;
  let dynamicCarbs = baseMacros.carbs;
  const dynamicFat = baseMacros.fat + (!isSnackOrBev && portion === 'athlete' ? 4 : 0);

  if (!isSnackOrBev && portion === 'athlete') {
    dynamicProtein += Math.round(baseMacros.protein * 0.4);
    dynamicCalories += 130;
  }

  if (!isSnackOrBev) {
    if (carbSwap === 'cauliflower-rice') {
      dynamicCarbs = Math.max(8, dynamicCarbs - 20);
      dynamicCalories = Math.max(80, dynamicCalories - 80);
    } else if (carbSwap === 'extra-greens') {
      dynamicCarbs = Math.max(6, dynamicCarbs - 22);
      dynamicCalories = Math.max(80, dynamicCalories - 90);
    } else if (carbSwap === 'sweet-potato') {
      dynamicCarbs += 6;
      dynamicCalories += 25;
    }
  }

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleExclusion = (tag: string) => {
    if (dietaryExclusions.includes(tag)) {
      setDietaryExclusions(dietaryExclusions.filter((t) => t !== tag));
    } else {
      setDietaryExclusions([...dietaryExclusions, tag]);
    }
  };

  const handleConfirm = () => {
    const custom: CustomizationOption = {
      portion: isSnackOrBev ? 'standard' : portion,
      carbSwap: isSnackOrBev ? 'original' : carbSwap,
      sauceOption: isSnackOrBev ? 'standard' : sauceOption,
      dietaryExclusions,
      addons: chosenAddons.map((a) => ({ id: a.id, name: a.name, price: a.price })),
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
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                {meal.subcategory || meal.category} · Customize &amp; Add-Ons
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {meal.name}
            </h2>
            <p className="text-xs text-stone-200 mt-1 line-clamp-2">
              {meal.description || meal.subtitle}
            </p>
          </div>
        </div>

        {/* Dynamic Verified Nutrition Bar */}
        <div className="bg-stone-100 dark:bg-stone-800/60 px-6 py-3 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 sm:gap-5 tabular-numbers">
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
            {typeof meal.macros.fiber === 'number' && (
              <div className="hidden sm:block">
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Fiber</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{meal.macros.fiber}g</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Updated Price (USD)</span>
            <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base tabular-numbers">
              ${finalUnitPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Customization & Add-ons Form */}
        <div className="p-6 space-y-6 max-h-[58vh] overflow-y-auto">

          {/* Dietary Labels & Allergen Disclosure */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {meal.tags.map((t) =>
                DIETARY_DISPLAY[t] ? (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-[11px] font-semibold text-stone-700 dark:text-stone-200"
                  >
                    {DIETARY_DISPLAY[t]}
                  </span>
                ) : null
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              {meal.allergens.length > 0 ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-stone-700 dark:text-stone-300">
                    <strong>Contains Allergens:</strong> {meal.allergens.join(', ')}
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                    Free from Top-9 Common Allergens
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Curated Add-Ons & Extras */}
          {availableAddons.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Add-Ons &amp; Extras (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                            isChecked
                              ? 'bg-amber-600 border-amber-600 text-white'
                              : 'border-stone-300 dark:border-stone-600'
                          }`}
                        >
                          {isChecked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-stone-400" />}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block truncate">
                            {addon.name}
                          </span>
                          {typeof addon.calories === 'number' && addon.calories > 0 && (
                            <span className="text-[10px] text-stone-500 dark:text-stone-400 tabular-nums">
                              +{addon.calories} kcal
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400 tabular-nums shrink-0">
                        +${addon.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Portion, Carb Swap & Sauce for Full Meals */}
          {!isSnackOrBev && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Select Portion Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      Balanced macro ratio tailored for clean dining
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
                      +40% Extra Lean Protein (+130 kcal)
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Clean Carb &amp; Base Selection
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'original', name: 'Chef Original Base', extra: 0, desc: 'As crafted on weekly menu' },
                    { id: 'cauliflower-rice', name: 'Riced Cauliflower (Keto)', extra: 1.00, desc: 'Ultra-low carb (-80 kcal)' },
                    { id: 'sweet-potato', name: 'Roasted Garnet Sweet Potato', extra: 0.50, desc: 'Complex low-glycemic carb' },
                    { id: 'jasmine-rice', name: 'Organic Steamed Jasmine Rice', extra: 0, desc: 'Clean, easily digestible fuel' },
                    { id: 'extra-greens', name: 'Extra Seasonal Greens (No Starch)', extra: 0, desc: 'Double French beans & broccolini' }
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Chef Sauce &amp; Dressing
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'standard', name: 'Standard Plated' },
                    { id: 'on-the-side', name: 'Sauce on Side' },
                    { id: 'light', name: 'Light Sauce' },
                    { id: 'extra', name: 'Extra Sauce (+$0.75)' }
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
            </>
          )}

          {/* Dietary Exclusions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Dietary &amp; Allergen Exclusions
            </label>
            <div className="flex flex-wrap gap-2">
              {['Gluten-Free Prep', 'Dairy-Free Prep', 'Nut-Free Kitchen Station', 'Low Sodium', 'No Alliums / Garlic'].map((exc) => {
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

          {/* Special Chef Instructions */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={
                isSnackOrBev
                  ? 'e.g. Light ice, unsweetened, pack napkins & utensils'
                  : 'e.g. Crisp well-done salmon skin, dressing in ramekin'
              }
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                Allergy requests noted here are reviewed by our chefs, <strong>but cannot automatically guarantee an allergen-free meal</strong> due to shared kitchen equipment.
              </span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-6 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 block">Total Item Price (USD)</span>
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
              Add to Dining Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
