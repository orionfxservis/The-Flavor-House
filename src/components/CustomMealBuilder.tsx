import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { BUILDER_PROTEINS, BUILDER_CARBS, BUILDER_VEGGIES, BUILDER_SAUCES, SALMON_BOWL_IMAGE } from '../data/mockMeals';
import { MealItem, CustomizationOption } from '../types/meal';

interface CustomMealBuilderProps {
  onAddCustomMealToCart: (meal: MealItem, customization: CustomizationOption, price: number) => void;
}

export const CustomMealBuilder: React.FC<CustomMealBuilderProps> = ({ onAddCustomMealToCart }) => {
  const [selectedProtein, setSelectedProtein] = useState(BUILDER_PROTEINS[0]);
  const [selectedCarb, setSelectedCarb] = useState(BUILDER_CARBS[0]);
  const [selectedVeggie, setSelectedVeggie] = useState(BUILDER_VEGGIES[0]);
  const [selectedSauce, setSelectedSauce] = useState(BUILDER_SAUCES[0]);
  const [isDoubleProtein, setIsDoubleProtein] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Calculate live macros
  const proteinMultiplier = isDoubleProtein ? 2 : 1;
  const totalCalories =
    selectedProtein.calories * proteinMultiplier +
    selectedCarb.calories +
    selectedVeggie.calories +
    selectedSauce.calories;

  const totalProtein =
    selectedProtein.protein * proteinMultiplier +
    selectedCarb.protein +
    selectedVeggie.protein +
    selectedSauce.protein;

  const totalCarbs =
    selectedProtein.carbs * proteinMultiplier +
    selectedCarb.carbs +
    selectedVeggie.carbs +
    selectedSauce.carbs;

  const totalFat =
    selectedProtein.fat * proteinMultiplier +
    selectedCarb.fat +
    selectedVeggie.fat +
    selectedSauce.fat;

  const totalPrice =
    selectedProtein.price * (isDoubleProtein ? 1.5 : 1) +
    selectedCarb.price +
    selectedVeggie.price +
    selectedSauce.price;

  const handleAddCustomMeal = () => {
    const customMeal: MealItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Macro Plate: ${selectedProtein.name.split(' ')[0]} & ${selectedCarb.name.split(' ')[0]}`,
      subtitle: `${selectedProtein.name} with ${selectedCarb.name}, ${selectedVeggie.name} & ${selectedSauce.name}`,
      description: `Chef-prepared custom formulation featuring fresh ${selectedProtein.name}, paired with ${selectedCarb.name}, tender ${selectedVeggie.name}, and finished with ${selectedSauce.name}.`,
      category: 'dinner',
      price: totalPrice,
      image: SALMON_BOWL_IMAGE,
      macros: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat
      },
      tags: ['gluten-free', 'high-protein'],
      ingredients: [selectedProtein.name, selectedCarb.name, selectedVeggie.name, selectedSauce.name],
      allergens: [],
      chefNote: 'Custom assembled by line chef according to specified gram-weight macro specifications.',
      heatingInstructions: 'Microwave for 2 minutes on high.'
    };

    const customization: CustomizationOption = {
      portion: isDoubleProtein ? 'athlete' : 'standard',
      carbSwap: 'original',
      sauceOption: 'standard',
      dietaryExclusions: []
    };

    onAddCustomMealToCart(customMeal, customization, totalPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <section id="builder-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Precision Nutrition Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Build Your Own Custom Meal
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
            Choose your protein, complex carb, organic vegetable, and artisanal sauce. Our chefs prepare it precisely to your target macros.
          </p>
        </div>

        {/* Builder Studio Grid: Left Options, Right Live Nutrition & Sticky Order Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-7">
            
            {/* Step 1: Protein Selection */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  Step 1: Choose Your Premium Protein
                </h3>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <input
                    type="checkbox"
                    checked={isDoubleProtein}
                    onChange={(e) => setIsDoubleProtein(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Double Protein Portion (+$4.75)</span>
                </label>
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
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {p.name}
                        </span>
                        <span className="text-xs font-bold text-amber-600 tabular-numbers">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                        {p.calories} kcal · {p.protein}g protein · {p.fat}g fat
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Clean Carb */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl">
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-3">
                Step 2: Choose Your Clean Carbohydrate or Keto Base
              </h3>
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
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {c.name}
                        </span>
                        <span className="text-xs font-bold text-amber-600 tabular-numbers">
                          ${c.price.toFixed(2)}
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

            {/* Step 3: Fresh Organic Vegetable */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl">
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-3">
                Step 3: Farm-Fresh Vegetable
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDER_VEGGIES.map((v) => {
                  const isSelected = selectedVeggie.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVeggie(v)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {v.name}
                        </span>
                        <span className="text-xs font-bold text-amber-600 tabular-numbers">
                          ${v.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                        {v.calories} kcal · {v.carbs}g carbs · {v.protein}g protein
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Artisanal Sauce */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl">
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-3">
                Step 4: Chef Finishing Glaze or Sauce
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUILDER_SAUCES.map((s) => {
                  const isSelected = selectedSauce.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSauce(s)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-600'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {s.name}
                        </span>
                        <span className="text-xs font-bold text-amber-600 tabular-numbers">
                          ${s.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                        {s.calories} kcal · {s.fat}g fat
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Macro Nutrition HUD & Add Button (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="glass-panel p-6 rounded-3xl shadow-xl border border-stone-200/80 dark:border-stone-800">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Custom Recipe Total
                </span>
                <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Recipe Breakdown preview */}
              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Protein:</span>
                  <span className="text-right font-semibold">{selectedProtein.name} {isDoubleProtein && '(Double)'}</span>
                </div>
                <div className="flex justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Clean Carb:</span>
                  <span className="text-right font-semibold">{selectedCarb.name}</span>
                </div>
                <div className="flex justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Vegetable:</span>
                  <span className="text-right font-semibold">{selectedVeggie.name}</span>
                </div>
                <div className="flex justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-medium">Sauce:</span>
                  <span className="text-right font-semibold">{selectedSauce.name}</span>
                </div>
              </div>

              {/* Live Nutrition Breakdown */}
              <div className="bg-stone-100/80 dark:bg-stone-800/80 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Calories
                  </span>
                  <span className="text-sm tabular-numbers">{totalCalories} kcal</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-stone-200/60 dark:border-stone-700">
                  <div className="bg-white/60 dark:bg-stone-900/60 p-2 rounded-lg">
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">Protein</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-numbers text-sm">
                      {totalProtein}g
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-stone-900/60 p-2 rounded-lg">
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">Carbs</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100 tabular-numbers text-sm">
                      {totalCarbs}g
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-stone-900/60 p-2 rounded-lg">
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">Fats</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100 tabular-numbers text-sm">
                      {totalFat}g
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Box Button */}
              <button
                type="button"
                onClick={handleAddCustomMeal}
                className="w-full mt-5 py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Box!</span>
                  </>
                ) : (
                  <>
                    <span>Add Custom Meal to Box</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portioned by gram weight in sterile kitchen</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
