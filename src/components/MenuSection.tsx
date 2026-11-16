import React, { useState } from 'react';
import {
  Sun,
  Utensils,
  Moon,
  Coffee,
  Search,
  Plus,
  Info,
  SlidersHorizontal,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { MealItem, MealCategory, DietaryFlag } from '../types/meal';
import { MEALS_CATALOG } from '../data/mockMeals';

interface MenuSectionProps {
  meals?: MealItem[];
  onCustomizeMeal: (meal: MealItem) => void;
  onQuickAdd: (meal: MealItem) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

const DIETARY_LABEL_MAP: Record<DietaryFlag, { label: string; style: string }> = {
  vegan: {
    label: 'Vegan',
    style: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60'
  },
  vegetarian: {
    label: 'Vegetarian',
    style: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-800/60'
  },
  'gluten-free': {
    label: 'Gluten-Free',
    style: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60'
  },
  'dairy-free': {
    label: 'Dairy-Free',
    style: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60'
  },
  'high-protein': {
    label: 'High-Protein',
    style: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
  },
  keto: {
    label: 'Keto',
    style: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60'
  },
  paleo: {
    label: 'Paleo',
    style: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60'
  },
  'plant-based': {
    label: 'Plant-Based',
    style: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60'
  },
  'low-sodium': {
    label: 'Low-Sodium',
    style: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60'
  },
  'nut-free': {
    label: 'Nut-Free',
    style: 'bg-lime-50 dark:bg-lime-950/40 text-lime-700 dark:text-lime-300 border-lime-200/80 dark:border-lime-800/60'
  }
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  meals = MEALS_CATALOG,
  onCustomizeMeal,
  onQuickAdd
}) => {
  const [activeSectionFilter, setActiveSectionFilter] = useState<'all' | MealCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietaryFlag | 'all'>('all');
  const [expandedIngredientsMealId, setExpandedIngredientsMealId] = useState<string | null>(null);

  const sectionsConfig: {
    id: MealCategory;
    title: string;
    shortTitle: string;
    subtitle: string;
    subcategories: string[];
    hours: string;
    icon: typeof Sun;
    accentColor: string;
  }[] = [
    {
      id: 'breakfast',
      title: 'Breakfast',
      shortTitle: 'Breakfast',
      subtitle: 'Omelets, avocado toast, protein pancakes and fresh morning bowls prepared from pasture-raised & organic ingredients.',
      subcategories: ['Omelets', 'Avocado Toast', 'Pancakes', 'Fresh Bowls'],
      hours: 'Served Daily 7:00 AM – 11:30 AM',
      icon: Sun,
      accentColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      id: 'lunch',
      title: 'Lunch',
      shortTitle: 'Lunch',
      subtitle: 'Balanced grain bowls, vibrant harvest salads, artisan sandwiches and oak-grilled meals crafted for midday energy.',
      subcategories: ['Grain Bowls', 'Salads', 'Sandwiches', 'Grilled Meals'],
      hours: 'Served Daily 11:30 AM – 4:30 PM',
      icon: Utensils,
      accentColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'dinner',
      title: 'Dinner',
      shortTitle: 'Dinner',
      subtitle: 'Wild-caught premium seafood, grass-fed steaks, free-range chicken and 12-hour executive chef specials.',
      subcategories: ['Premium Seafood', 'Steaks', 'Chicken', 'Chef Specials'],
      hours: 'Served Daily 4:30 PM – 10:30 PM',
      icon: Moon,
      accentColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      id: 'snacks',
      title: 'Snacks & Beverages',
      shortTitle: 'Snacks & Drinks',
      subtitle: 'Superfood smoothies, cold-pressed juices, wholesome clean desserts and fiber-rich light bites.',
      subcategories: ['Smoothies', 'Juices', 'Desserts', 'Light Bites'],
      hours: 'Available All Day',
      icon: Coffee,
      accentColor: 'text-rose-600 dark:text-rose-400'
    }
  ];

  const diets: { id: DietaryFlag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'high-protein', label: 'High Protein (30g+)' },
    { id: 'keto', label: 'Keto / Low-Carb' }
  ];

  const getMealsForSection = (category: MealCategory) => {
    return meals.filter((meal) => {
      if (meal.category !== category) return false;
      if (selectedDiet !== 'all' && !meal.tags.includes(selectedDiet)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          meal.name.toLowerCase().includes(q) ||
          meal.subtitle.toLowerCase().includes(q) ||
          meal.description.toLowerCase().includes(q) ||
          (meal.subcategory && meal.subcategory.toLowerCase().includes(q)) ||
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
            <span>Verified Nutrition · Clear Allergens · Custom Add-Ons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            The Restaurant Dining Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2">
            Explore chef-crafted Breakfast, Lunch, Dinner, and Snacks &amp; Beverages with full nutrition facts, dietary labels, allergen transparency, and custom add-ons.
          </p>
        </div>

        {/* Category Filter Tabs & Search Dish Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-5">

          {/* Left: 4 Menu Category Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 p-1 bg-stone-200/80 dark:bg-stone-800/80 rounded-xl shrink-0">
            <button
              onClick={() => setActiveSectionFilter('all')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSectionFilter === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All Menus
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
                  <span>{sec.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Search Dish */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, bowls, smoothies..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-xs"
            />
          </div>

        </div>

        {/* Dietary Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 text-xs">
          <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1 shrink-0 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Dietary Labels:
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

        {/* Menu Category Sections */}
        <div className="space-y-14">
          {sectionsToRender.map((sec) => {
            const categoryMeals = getMealsForSection(sec.id);
            const Icon = sec.icon;

            return (
              <div key={sec.id} className="scroll-mt-24">

                {/* Section Header Banner */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Icon className={`w-5 h-5 ${sec.accentColor}`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {sec.hours}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
                      {sec.subtitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] text-stone-500 dark:text-stone-400">
                      {sec.subcategories.map((sub, i) => (
                        <React.Fragment key={sub}>
                          <span className="font-medium text-stone-700 dark:text-stone-300">{sub}</span>
                          {i < sec.subcategories.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 tabular-numbers shrink-0">
                    {categoryMeals.length} Menu Items Available
                  </span>
                </div>

                {/* Dishes Grid */}
                {categoryMeals.length === 0 ? (
                  <div className="glass-panel p-8 rounded-2xl text-center text-stone-500 text-xs">
                    No dishes found matching your current search or dietary filter in {sec.title}.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryMeals.map((meal) => {
                      const visibleDietaryTags = meal.tags
                        .filter((t) => DIETARY_LABEL_MAP[t])
                        .slice(0, 3);
                      const isExpanded = expandedIngredientsMealId === meal.id;

                      return (
                        <div
                          key={meal.id}
                          className="group glass-panel rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] border border-stone-200/60 dark:border-stone-800/80"
                        >
                          {/* Food Photo Lead */}
                          <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                            {/* Subcategory / Badge */}
                            {(meal.subcategory || meal.badge) && (
                              <div className="absolute top-3 left-3 px-2.5 py-1 bg-stone-950/75 backdrop-blur-md rounded-md text-[10px] font-semibold text-stone-100 uppercase tracking-wide">
                                {meal.subcategory || meal.badge}
                              </div>
                            )}

                            {/* USD Price Tag */}
                            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-md text-xs font-bold text-stone-900 dark:text-stone-100 tabular-numbers shadow-xs">
                              ${meal.price.toFixed(2)} <span className="text-[10px] font-medium text-stone-500">USD</span>
                            </div>

                            {/* Verified Nutrition Macro Ribbon */}
                            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10px] text-stone-100 px-2.5 py-1 rounded-md bg-stone-950/60 backdrop-blur-xs tabular-numbers font-medium">
                              <span className="font-semibold text-amber-300">{meal.macros.calories} kcal</span>
                              <span>·</span>
                              <span className="text-emerald-300 font-semibold">{meal.macros.protein}g P</span>
                              <span>·</span>
                              <span>{meal.macros.carbs}g C</span>
                              <span>·</span>
                              <span>{meal.macros.fat}g F</span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-2.5">
                              {/* Item Name & Description */}
                              <div>
                                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                                  {meal.name}
                                </h4>
                                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                                  {meal.description || meal.subtitle}
                                </p>
                              </div>

                              {/* Dietary Labels */}
                              {visibleDietaryTags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {visibleDietaryTags.map((tag) => {
                                    const cfg = DIETARY_LABEL_MAP[tag];
                                    return (
                                      <span
                                        key={tag}
                                        className={`px-2 py-0.5 text-[10px] font-semibold rounded border ${cfg.style}`}
                                      >
                                        {cfg.label}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Verified Nutrition & Allergen Line */}
                              <div className="text-[11px] space-y-1 pt-0.5">
                                <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                                  {meal.allergens.length > 0 ? (
                                    <>
                                      <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                                      <span className="truncate">
                                        <strong className="font-semibold text-stone-800 dark:text-stone-200">Allergens:</strong>{' '}
                                        {meal.allergens.join(', ')}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                                        Top-9 Allergen Free
                                      </span>
                                    </>
                                  )}
                                </div>

                                {meal.addons && meal.addons.length > 0 && (
                                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                                    <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                                    <span className="truncate">
                                      {meal.addons.length} custom add-ons available
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Nutrition, Ingredients & Add-Ons Drawer Toggle */}
                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedIngredientsMealId(isExpanded ? null : meal.id)
                                  }
                                  className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Info className="w-3 h-3" />
                                  <span>{isExpanded ? 'Hide Nutrition & Ingredients' : 'Nutrition, Ingredients & Add-Ons'}</span>
                                </button>

                                {isExpanded && (
                                  <div className="mt-2 p-3 rounded-xl bg-stone-100/90 dark:bg-stone-800/80 text-[11px] text-stone-600 dark:text-stone-300 space-y-2 border border-stone-200/70 dark:border-stone-700/70">
                                    <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                                      <span>{meal.nutritionVerified !== false ? 'Verified Nutrition Facts' : 'Nutrition Facts'}</span>
                                      <span className="font-mono tabular-nums">
                                        Fiber {meal.macros.fiber ?? 5}g · Sodium {meal.macros.sodium ?? 420}mg
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-0.5">
                                        Ingredients:
                                      </span>
                                      <p className="leading-snug">{meal.ingredients.join(', ')}</p>
                                    </div>
                                    {meal.addons && meal.addons.length > 0 && (
                                      <div className="pt-1 border-t border-stone-200/70 dark:border-stone-700/70">
                                        <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-0.5">
                                          Popular Add-Ons:
                                        </span>
                                        <ul className="space-y-0.5">
                                          {meal.addons.map((a) => (
                                            <li key={a.id} className="flex justify-between">
                                              <span>{a.name}</span>
                                              <span className="font-mono font-semibold tabular-nums">+${a.price.toFixed(2)}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center gap-2">
                              {meal.available === false ? (
                                <span className="flex-1 py-2 px-3 text-xs font-semibold text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800/70 rounded-lg text-center">
                                  Currently Sold Out
                                </span>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => onCustomizeMeal(meal)}
                                    className="flex-1 py-2 px-3 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer text-center"
                                  >
                                    Customize &amp; Add-Ons
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => onQuickAdd(meal)}
                                    className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                                    title="Quick Add to Dining Order"
                                    aria-label={`Add ${meal.name} to order`}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
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
