import React, { useState } from 'react';
import { 
  Sun, 
  Utensils, 
  Moon, 
  Search, 
  Plus, 
  Info, 
  Check, 
  Sparkles, 
  Clock, 
  SlidersHorizontal,
  ShoppingBag
} from 'lucide-react';
import { MealItem, MealCategory, DietaryFlag } from '../types/meal';
import { MEALS_CATALOG } from '../data/mockMeals';

interface MenuSectionProps {
  meals?: MealItem[];
  onCustomizeMeal: (meal: MealItem) => void;
  onQuickAdd: (meal: MealItem) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  meals = MEALS_CATALOG,
  onCustomizeMeal,
  onQuickAdd,
  cartCount,
  onOpenCart
}) => {
  const [activeSectionFilter, setActiveSectionFilter] = useState<'all' | 'breakfast' | 'lunch' | 'dinner'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietaryFlag | 'all'>('all');
  const [expandedIngredientsMealId, setExpandedIngredientsMealId] = useState<string | null>(null);

  const sectionsConfig: {
    id: MealCategory;
    title: string;
    subtitle: string;
    hours: string;
    icon: typeof Sun;
    accentColor: string;
  }[] = [
    {
      id: 'breakfast',
      title: 'Morning Breakfast',
      subtitle: 'Artisanal brioche & levain tartines, cast-iron skillets, fluffy protein ricotta pancakes & cold-pressed morning fuel',
      hours: 'Served Daily 7:00 AM – 11:30 AM',
      icon: Sun,
      accentColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      id: 'lunch',
      title: 'Lunch Service',
      subtitle: 'American Wagyu smash burgers, fresh Pacific salmon wellness bowls, organic herb chicken & vibrant salads',
      hours: 'Served Daily 11:30 AM – 4:30 PM',
      icon: Utensils,
      accentColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'dinner',
      title: 'Dinner Dining',
      subtitle: 'Executive chef entrées, 12-hour Cabernet braised short ribs, USDA Prime tenderloin steaks & wild king seafood',
      hours: 'Served Daily 4:30 PM – 10:30 PM',
      icon: Moon,
      accentColor: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  const diets: { id: DietaryFlag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'high-protein', label: 'High Protein (30g+)' },
    { id: 'keto', label: 'Keto / Low-Carb' },
  ];

  // Helper to filter meals for a specific section
  const getMealsForSection = (category: MealCategory) => {
    return meals.filter((meal) => {
      if (meal.category !== category) return false;
      if (selectedDiet !== 'all' && !meal.tags.includes(selectedDiet)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          meal.name.toLowerCase().includes(q) ||
          meal.subtitle.toLowerCase().includes(q) ||
          meal.ingredients.some((i) => i.toLowerCase().includes(q))
        );
      }
      return true;
    });
  };

  const sectionsToRender = sectionsConfig.filter((sec) =>
    activeSectionFilter === 'all' ? true : sec.id === activeSectionFilter
  );

  return (
    <section id="menu-section" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Restaurant Menu Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
            <span>Restaurant Dining & Direct Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Farm-To-Table</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            The Restaurant Dining Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2">
            Explore our curated culinary courses prepared by executive chefs. Order directly for express table dining or chilled door delivery nationwide.
          </p>
        </div>

        {/* Section Segmented Switcher, Centered Order Button & Search Dish Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
          
          {/* Left: Section filter tabs - wraps cleanly with zero horizontal scroll */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 p-1 bg-stone-200/80 dark:bg-stone-800/80 rounded-xl shrink-0">
            <button
              onClick={() => setActiveSectionFilter('all')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSectionFilter === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All Dining Menus
            </button>
            {sectionsConfig.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionFilter(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeSectionFilter === sec.id
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-600" />
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Middle & Right: Order Button balanced between Dinner Dining & Search Dish */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-1">
            <button
              onClick={onOpenCart}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-xl hover:bg-stone-800 dark:hover:bg-white shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer lg:mx-auto"
              aria-label="View Dining Order"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order</span>
              <span className="bg-amber-600 dark:bg-amber-500 text-white dark:text-stone-950 text-xs rounded-full px-1.5 py-0.2 tabular-numbers font-bold">
                {cartCount}
              </span>
            </button>

            {/* Right: Search Dish Bar */}
            <div className="relative w-full sm:flex-1 lg:w-60 xl:w-68 lg:flex-none">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-xs"
              />
            </div>
          </div>

        </div>

        {/* Dietary Filters Pill Strip - wraps cleanly with zero horizontal scroll */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 text-xs">
          <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1 shrink-0 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Dietary Filter:
          </span>
          {diets.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiet(d.id)}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedDiet === d.id
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Render each of the 3 requested sections: Morning Breakfast, Lunch, Dinner Dining */}
        <div className="space-y-12">
          {sectionsToRender.map((sec) => {
            const meals = getMealsForSection(sec.id);
            const Icon = sec.icon;

            return (
              <div key={sec.id} className="scroll-mt-24">
                
                {/* Section Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-5 h-5 ${sec.accentColor}`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        {sec.hours}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
                      {sec.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 tabular-numbers">
                    {meals.length} Chef Creations Available
                  </span>
                </div>

                {/* Section Dishes Grid */}
                {meals.length === 0 ? (
                  <div className="glass-panel p-8 rounded-2xl text-center text-stone-500 text-xs">
                    No dishes found matching your current search or diet filter in this section.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="group glass-panel rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] border border-stone-200/60 dark:border-stone-800/80"
                      >
                        {/* 65% Image Height Lead */}
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                          {/* Badge */}
                          {meal.badge && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-stone-950/75 backdrop-blur-md rounded-md text-[10px] font-semibold text-stone-200 uppercase tracking-wide">
                              {meal.badge}
                            </div>
                          )}

                          {/* Price Tag in Tabular Nums */}
                          <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-md text-xs font-bold text-stone-900 dark:text-stone-100 tabular-numbers shadow-xs">
                            ${meal.price.toFixed(2)}
                          </div>

                          {/* Nutritional Macro Ribbon */}
                          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10px] text-stone-200 px-2 py-1 rounded bg-stone-950/50 backdrop-blur-xs tabular-numbers font-medium">
                            <span>{meal.macros.calories} kcal</span>
                            <span>·</span>
                            <span className="text-emerald-300 font-semibold">{meal.macros.protein}g protein</span>
                            <span>·</span>
                            <span>{meal.macros.carbs}g carbs</span>
                            <span>·</span>
                            <span>{meal.macros.fat}g fat</span>
                          </div>
                        </div>

                        {/* Details & Ingredients */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                              {meal.name}
                            </h4>
                            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                              {meal.subtitle}
                            </p>

                            {/* Ingredients Dropdown Affordance */}
                            <div className="mt-2.5">
                              <button
                                onClick={() =>
                                  setExpandedIngredientsMealId(
                                    expandedIngredientsMealId === meal.id ? null : meal.id
                                  )
                                }
                                className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Info className="w-3 h-3" />
                                <span>{expandedIngredientsMealId === meal.id ? 'Hide Ingredients' : 'View Fresh Ingredients'}</span>
                              </button>

                              {expandedIngredientsMealId === meal.id && (
                                <div className="mt-2 p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-[11px] text-stone-600 dark:text-stone-300 space-y-1 animate-in fade-in duration-200">
                                  <div className="font-semibold text-stone-800 dark:text-stone-200">
                                    Organic Ingredients:
                                  </div>
                                  <p className="leading-tight">
                                    {meal.ingredients.join(', ')}
                                  </p>
                                  {meal.allergens.length > 0 && (
                                    <div className="text-amber-600 dark:text-amber-400 font-semibold pt-1">
                                      Allergens: {meal.allergens.join(', ')}
                                    </div>
                                  )}
                                  {meal.chefNote && (
                                    <div className="text-stone-500 italic pt-0.5">
                                      Note: {meal.chefNote}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 mt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center gap-2">
                            {meal.available === false ? (
                              <span className="flex-1 py-2 px-3 text-xs font-semibold text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800/70 rounded-lg text-center">
                                Currently Sold Out
                              </span>
                            ) : (
                              <>
                                <button
                                  onClick={() => onCustomizeMeal(meal)}
                                  className="flex-1 py-2 px-3 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer text-center"
                                >
                                  Customize
                                </button>

                                <button
                                  onClick={() => onQuickAdd(meal)}
                                  className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                                  title="Add to Dining Order"
                                  aria-label={`Add ${meal.name} to order`}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
