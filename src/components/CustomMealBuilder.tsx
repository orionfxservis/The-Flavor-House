import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  Flame,
  RotateCcw
} from 'lucide-react';
import {
  BUILDER_PROTEINS,
  BUILDER_CARBS,
  BUILDER_VEGGIES,
  BUILDER_SAUCES,
  BUILDER_PORTIONS,
  BUILDER_EXTRAS,
  SALMON_BOWL_IMAGE
} from '../data/mockMeals';
import { MealItem, CustomizationOption } from '../types/meal';

interface CustomMealBuilderProps {
  onAddCustomMealToCart: (meal: MealItem, customization: CustomizationOption, price: number) => void;
}

export const CustomMealBuilder: React.FC<CustomMealBuilderProps> = ({ onAddCustomMealToCart }) => {
  const [selectedProtein, setSelectedProtein] = useState(BUILDER_PROTEINS[0]);
  const [selectedCarb, setSelectedCarb] = useState(BUILDER_CARBS[0]);
  const [selectedVeggieIds, setSelectedVeggieIds] = useState<string[]>([BUILDER_VEGGIES[0].id]);
  const [selectedSauce, setSelectedSauce] = useState(BUILDER_SAUCES[1]);
  const [selectedPortion, setSelectedPortion] = useState(BUILDER_PORTIONS[0]);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVeggies = BUILDER_VEGGIES.filter((v) => selectedVeggieIds.includes(v.id));
  const selectedExtras = BUILDER_EXTRAS.filter((ex) => selectedExtraIds.includes(ex.id));

  const toggleVeggie = (id: string) => {
    setSelectedVeggieIds((prev) => {
      if (prev.includes(id)) {
        // Keep at least 1 vegetable selected unless user deselects intentionally—allow 0 or more cleanly
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const toggleExtra = (id: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedProtein(BUILDER_PROTEINS[0]);
    setSelectedCarb(BUILDER_CARBS[0]);
    setSelectedVeggieIds([BUILDER_VEGGIES[0].id]);
    setSelectedSauce(BUILDER_SAUCES[1]);
    setSelectedPortion(BUILDER_PORTIONS[0]);
    setSelectedExtraIds([]);
    setSpecialInstructions('');
  };

  // Live macros & USD pricing calculations
  const mult = selectedPortion.multiplier;
  const veggiesCals = selectedVeggies.reduce((sum, v) => sum + v.calories, 0);
  const veggiesProt = selectedVeggies.reduce((sum, v) => sum + v.protein, 0);
  const veggiesCarbs = selectedVeggies.reduce((sum, v) => sum + v.carbs, 0);
  const veggiesFat = selectedVeggies.reduce((sum, v) => sum + v.fat, 0);
  const veggiesPrice = selectedVeggies.reduce((sum, v) => sum + v.price, 0);

  const extrasCals = selectedExtras.reduce((sum, ex) => sum + ex.calories, 0);
  const extrasProt = selectedExtras.reduce((sum, ex) => sum + ex.protein, 0);
  const extrasCarbs = selectedExtras.reduce((sum, ex) => sum + ex.carbs, 0);
  const extrasFat = selectedExtras.reduce((sum, ex) => sum + ex.fat, 0);
  const extrasPrice = selectedExtras.reduce((sum, ex) => sum + ex.price, 0);

  const totalCalories = Math.round(
    (selectedProtein.calories + selectedCarb.calories) * mult +
      veggiesCals +
      selectedSauce.calories +
      extrasCals
  );

  const totalProtein = Math.round(
    (selectedProtein.protein + selectedCarb.protein) * mult +
      veggiesProt +
      selectedSauce.protein +
      extrasProt
  );

  const totalCarbs = Math.round(
    (selectedProtein.carbs + selectedCarb.carbs) * mult +
      veggiesCarbs +
      selectedSauce.carbs +
      extrasCarbs
  );

  const totalFat = Math.round(
    (selectedProtein.fat + selectedCarb.fat) * mult +
      veggiesFat +
      selectedSauce.fat +
      extrasFat
  );

  const totalPrice = Number(
    (
      selectedProtein.price +
      selectedCarb.price +
      veggiesPrice +
      selectedSauce.price +
      selectedPortion.extraPrice +
      extrasPrice
    ).toFixed(2)
  );

  // Dynamic allergen detection from chosen components
  const detectedAllergens = Array.from(
    new Set(
      [
        selectedProtein.allergen,
        selectedCarb.allergen,
        ...selectedVeggies.map((v) => v.allergen),
        selectedSauce.allergen,
        ...selectedExtras.map((ex) => ex.allergen)
      ].filter(Boolean)
    )
  );

  const handleAddCustomMeal = () => {
    const veggieSummary =
      selectedVeggies.length > 0
        ? selectedVeggies.map((v) => v.shortName).join(', ')
        : 'No Extra Vegetables';

    const customMeal: MealItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Bowl: ${selectedProtein.shortName} & ${selectedCarb.shortName}`,
      subtitle: `${selectedPortion.name} · ${selectedProtein.shortName}, ${selectedCarb.shortName}, ${veggieSummary}, ${selectedSauce.shortName} Dressing`,
      description: `Custom-built ${selectedPortion.name.toLowerCase()} bowl with ${selectedProtein.name}, ${selectedCarb.name}, ${veggieSummary}, and ${selectedSauce.name}.`,
      category: 'lunch',
      subcategory: 'Build Your Own',
      price: totalPrice,
      image: SALMON_BOWL_IMAGE,
      nutritionVerified: true,
      macros: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat
      },
      tags: ['high-protein'],
      ingredients: [
        selectedProtein.name,
        selectedCarb.name,
        ...selectedVeggies.map((v) => v.name),
        selectedSauce.name,
        ...selectedExtras.map((ex) => ex.name)
      ],
      allergens: detectedAllergens,
      chefNote: 'Prepared to order from your custom ingredient and portion selections.',
      heatingInstructions: 'Enjoy warm or chilled per ingredient preference.'
    };

    const customization: CustomizationOption = {
      portion: selectedPortion.id,
      carbSwap: 'original',
      sauceOption: 'standard',
      dietaryExclusions: [],
      addons: selectedExtras.map((ex) => ({
        id: ex.id,
        name: ex.name,
        price: ex.price
      })),
      specialInstructions: specialInstructions.trim() || undefined
    };

    onAddCustomMealToCart(customMeal, customization, totalPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <section id="builder-section" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Culinary Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Build Your Own Meal
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-2">
            Customize your protein, wholesome base, fresh vegetables, house dressing, portion size, and extras—watch your price and nutrition update in real time before adding to cart.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

          {/* Left 6 Customization Steps (8 cols) */}
          <div className="lg:col-span-8 space-y-5">

            {/* 1. Choose Protein */}
            <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  1. Choose Protein
                </h3>
                <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Select 1 · Chicken, Salmon, Beef, Tofu
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDER_PROTEINS.map((p) => {
                  const isSelected = selectedProtein.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProtein(p)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 dark:bg-amber-950/25 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {p.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 tabular-numbers shrink-0">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                        <span>{p.calories} kcal · {p.protein}g P · {p.fat}g F</span>
                        {p.allergen && (
                          <span className="text-amber-700 dark:text-amber-400 font-medium">
                            Allergen: {p.allergen}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Base */}
            <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  2. Choose Base
                </h3>
                <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Select 1 · Brown rice, Quinoa, Greens
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDER_CARBS.map((c) => {
                  const isSelected = selectedCarb.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCarb(c)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 dark:bg-amber-950/25 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {c.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 tabular-numbers shrink-0">
                          +${c.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                        {c.calories} kcal · {c.carbs}g carbs · {c.protein}g protein
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Choose Vegetables (Multi-select) */}
            <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  3. Choose Vegetables
                </h3>
                <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Multi-select · Broccoli, Avocado, Spinach
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDER_VEGGIES.map((v) => {
                  const isSelected = selectedVeggieIds.includes(v.id);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => toggleVeggie(v.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 dark:bg-amber-950/25 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-amber-600 border-amber-600 text-white'
                                : 'border-stone-300 dark:border-stone-600'
                            }`}
                          >
                            {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-stone-400" />}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                            {v.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 tabular-numbers shrink-0">
                          +${v.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-1 pl-6 text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                        {v.calories} kcal · {v.carbs}g carbs · {v.protein}g protein
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Choose Dressing & 5. Portion Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 4. Choose Dressing */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    4. Choose Dressing
                  </h3>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Ranch, Lemon, Garlic
                  </span>
                </div>
                <div className="space-y-2.5">
                  {BUILDER_SAUCES.map((s) => {
                    const isSelected = selectedSauce.id === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedSauce(s)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/60 dark:bg-amber-950/25 ring-1 ring-amber-600'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                            {s.name}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 tabular-numbers shrink-0">
                            +${s.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                          <span>{s.calories} kcal · {s.fat}g fat</span>
                          {s.allergen && (
                            <span className="text-amber-700 dark:text-amber-400 font-medium">
                              {s.allergen}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Portion Size */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    5. Portion Size
                  </h3>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Regular, Large, Extra
                  </span>
                </div>
                <div className="space-y-2.5">
                  {BUILDER_PORTIONS.map((pt) => {
                    const isSelected = selectedPortion.id === pt.id;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setSelectedPortion(pt)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/60 dark:bg-amber-950/25 ring-1 ring-amber-600'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {pt.name} Portion
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 tabular-numbers">
                            {pt.extraPrice === 0 ? 'Included' : `+$${pt.extraPrice.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          {pt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 6. Extras (Extra protein, Cheese, Nuts) */}
            <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  6. Extras (Optional Add-Ons)
                </h3>
                <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Extra protein, Cheese, Nuts
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUILDER_EXTRAS.map((ex) => {
                  const isSelected = selectedExtraIds.includes(ex.id);
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => toggleExtra(ex.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 dark:bg-amber-950/25 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-amber-600 border-amber-600 text-white'
                                : 'border-stone-300 dark:border-stone-600'
                            }`}
                          >
                            {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-stone-400" />}
                          </span>
                          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                            {ex.name}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 pl-6 flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 dark:text-stone-400 tabular-numbers">
                          +{ex.calories} kcal · +{ex.protein}g P
                        </span>
                        <span className="font-mono font-bold text-amber-700 dark:text-amber-400 tabular-numbers">
                          +${ex.price.toFixed(2)}
                        </span>
                      </div>
                      {ex.allergen && (
                        <span className="block pl-6 mt-1 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                          Contains: {ex.allergen}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Special Instructions & Clear Allergy Disclaimer */}
            <div className="glass-panel p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800/80 space-y-3">
              <label
                htmlFor="custom-meal-special-instructions"
                className="block font-serif font-bold text-base text-stone-900 dark:text-stone-100"
              >
                7. Special Instructions
              </label>
              <textarea
                id="custom-meal-special-instructions"
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Dressing on the side, light salt, chop broccoli finely, well-seared salmon..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Allergy Warning:</strong> While our kitchen carefully reviews all special instructions, <strong>allergy requests cannot automatically guarantee an allergen-free meal</strong> due to shared culinary surfaces, fryers, and preparation equipment.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Price & Nutrition Summary Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="glass-panel p-6 rounded-3xl shadow-xl border border-stone-200/80 dark:border-stone-800">

              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Live Custom Price
                  </span>
                  <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                    ${totalPrice.toFixed(2)} <span className="text-xs font-sans font-medium text-stone-500">USD</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
                  title="Reset selections"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between gap-2 text-stone-700 dark:text-stone-300">
                  <span>Protein: <strong className="text-stone-900 dark:text-stone-100">{selectedProtein.shortName}</strong></span>
                  <span className="font-mono font-semibold tabular-numbers shrink-0">${selectedProtein.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2 text-stone-700 dark:text-stone-300">
                  <span>Base: <strong className="text-stone-900 dark:text-stone-100">{selectedCarb.shortName}</strong></span>
                  <span className="font-mono font-semibold tabular-numbers shrink-0">+${selectedCarb.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2 text-stone-700 dark:text-stone-300">
                  <span className="truncate">
                    Veggies:{' '}
                    <strong className="text-stone-900 dark:text-stone-100">
                      {selectedVeggies.length > 0 ? selectedVeggies.map((v) => v.shortName).join(', ') : 'None'}
                    </strong>
                  </span>
                  <span className="font-mono font-semibold tabular-numbers shrink-0">+${veggiesPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2 text-stone-700 dark:text-stone-300">
                  <span>Dressing: <strong className="text-stone-900 dark:text-stone-100">{selectedSauce.shortName}</strong></span>
                  <span className="font-mono font-semibold tabular-numbers shrink-0">+${selectedSauce.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2 text-stone-700 dark:text-stone-300">
                  <span>Portion: <strong className="text-stone-900 dark:text-stone-100">{selectedPortion.name}</strong></span>
                  <span className="font-mono font-semibold tabular-numbers shrink-0">
                    {selectedPortion.extraPrice === 0 ? 'Included' : `+$${selectedPortion.extraPrice.toFixed(2)}`}
                  </span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between gap-2 text-emerald-700 dark:text-emerald-400">
                    <span className="truncate">
                      Extras: <strong>{selectedExtras.map((e) => e.name.split(' (')[0]).join(', ')}</strong>
                    </span>
                    <span className="font-mono font-semibold tabular-numbers shrink-0">+${extrasPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Live Nutrition Breakdown */}
              <div className="bg-stone-100/80 dark:bg-stone-800/80 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Estimated Calories
                  </span>
                  <span className="text-sm tabular-numbers">{totalCalories} kcal</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-stone-200/60 dark:border-stone-700">
                  <div className="bg-white/70 dark:bg-stone-900/70 p-2 rounded-lg">
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">Protein</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-numbers text-sm">
                      {totalProtein}g
                    </span>
                  </div>
                  <div className="bg-white/70 dark:bg-stone-900/70 p-2 rounded-lg">
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">Carbs</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100 tabular-numbers text-sm">
                      {totalCarbs}g
                    </span>
                  </div>
                  <div className="bg-white/70 dark:bg-stone-900/70 p-2 rounded-lg">
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">Fats</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100 tabular-numbers text-sm">
                      {totalFat}g
                    </span>
                  </div>
                </div>
              </div>

              {/* Allergen Detection Line */}
              <div className="mt-3 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/60 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-stone-600 dark:text-stone-300 leading-snug">
                  {detectedAllergens.length > 0
                    ? `Selected ingredients contain: ${detectedAllergens.join(', ')}. Prepared in a shared kitchen.`
                    : 'No major allergens in selected items, though prepared in a shared kitchen.'}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddCustomMeal}
                className="w-full mt-4 py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Custom Meal to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Add Custom Meal · ${totalPrice.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
