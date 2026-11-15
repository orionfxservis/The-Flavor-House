import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, AlertCircle } from 'lucide-react';
import { MealItem, MealCategory } from '../../types/meal';
import { AdminRole } from '../../types/admin';
import {
  HERO_IMAGE,
  STEAK_MEAL_IMAGE,
  CHICKEN_MEAL_IMAGE,
  SALMON_BOWL_IMAGE,
  BREAKFAST_AVOCADO_TOAST,
  BREAKFAST_SHAKSHUKA,
  BREAKFAST_PANCAKES,
  LUNCH_WAGYU_BURGER,
  DINNER_SHORT_RIB
} from '../../data/mockMeals';

const PHOTO_PRESETS = [
  { label: 'Avocado Tartine (Breakfast)', url: BREAKFAST_AVOCADO_TOAST },
  { label: 'Cast-Iron Shakshuka (Breakfast)', url: BREAKFAST_SHAKSHUKA },
  { label: 'Ricotta Pancakes (Breakfast)', url: BREAKFAST_PANCAKES },
  { label: 'Wagyu Truffle Burger (Lunch)', url: LUNCH_WAGYU_BURGER },
  { label: 'Salmon Wellness Bowl (Lunch)', url: SALMON_BOWL_IMAGE },
  { label: 'Herb Chicken Plate (Lunch)', url: CHICKEN_MEAL_IMAGE },
  { label: '12-Hour Braised Short Rib (Dinner)', url: DINNER_SHORT_RIB },
  { label: 'Chimichurri Filet Mignon (Dinner)', url: STEAK_MEAL_IMAGE },
  { label: 'Pan-Seared King Salmon (Dinner)', url: HERO_IMAGE }
];

interface AdminMenuSectionProps {
  meals: MealItem[];
  onAddMeal: (meal: MealItem) => void;
  onUpdateMeal: (meal: MealItem) => void;
  onDeleteMeal: (mealId: string) => void;
  userRole: AdminRole;
}

export const AdminMenuSection: React.FC<AdminMenuSectionProps> = ({
  meals,
  onAddMeal,
  onUpdateMeal,
  onDeleteMeal,
  userRole
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | MealCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMeal, setEditingMeal] = useState<MealItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('18.50');
  const [category, setCategory] = useState<MealCategory>('lunch');
  const [image, setImage] = useState(HERO_IMAGE);
  const [calories, setCalories] = useState('480');
  const [protein, setProtein] = useState('38');
  const [ingredientsText, setIngredientsText] = useState('Organic Produce, Pasture-Raised Protein, Extra Virgin Olive Oil');
  const [available, setAvailable] = useState(true);

  const canModifyMenu = userRole === 'owner' || userRole === 'manager';

  const openAddModal = () => {
    setEditingMeal(null);
    setName('');
    setSubtitle('');
    setPrice('18.50');
    setCategory('lunch');
    setImage(HERO_IMAGE);
    setCalories('480');
    setProtein('38');
    setIngredientsText('Organic Produce, Pasture-Raised Protein, Extra Virgin Olive Oil');
    setAvailable(true);
    setIsModalOpen(true);
  };

  const openEditModal = (meal: MealItem) => {
    setEditingMeal(meal);
    setName(meal.name);
    setSubtitle(meal.subtitle);
    setPrice(meal.price.toFixed(2));
    setCategory(meal.category);
    setImage(meal.image);
    setCalories(String(meal.macros.calories));
    setProtein(String(meal.macros.protein));
    setIngredientsText(meal.ingredients.join(', '));
    setAvailable(meal.available !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedPrice = Math.max(1, parseFloat(price) || 16.5);
    const parsedIngredients = ingredientsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingMeal) {
      onUpdateMeal({
        ...editingMeal,
        name: name.trim(),
        subtitle: subtitle.trim() || editingMeal.subtitle,
        price: parsedPrice,
        category,
        image: image.trim() || HERO_IMAGE,
        available,
        ingredients: parsedIngredients.length > 0 ? parsedIngredients : editingMeal.ingredients,
        macros: {
          ...editingMeal.macros,
          calories: parseInt(calories, 10) || editingMeal.macros.calories,
          protein: parseInt(protein, 10) || editingMeal.macros.protein
        }
      });
    } else {
      const newMeal: MealItem = {
        id: `dish-${Date.now()}`,
        name: name.trim(),
        subtitle: subtitle.trim() || 'Chef-crafted seasonal entrée with organic ingredients',
        description: subtitle.trim() || 'Prepared fresh in small culinary batches.',
        category,
        price: parsedPrice,
        image: image.trim() || HERO_IMAGE,
        available,
        macros: {
          calories: parseInt(calories, 10) || 480,
          protein: parseInt(protein, 10) || 36,
          carbs: 32,
          fat: 18
        },
        tags: ['gluten-free', 'high-protein'],
        ingredients: parsedIngredients.length > 0 ? parsedIngredients : ['Organic Produce', 'Extra Virgin Olive Oil'],
        allergens: [],
        badge: 'Chef Addition'
      };
      onAddMeal(newMeal);
    }

    setIsModalOpen(false);
  };

  const filteredMeals = meals.filter((m) => {
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Menu Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Add, edit, or delete dishes with live prices, photos, categories, and availability synced directly to the main menu.
          </p>
        </div>

        {canModifyMenu && (
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </button>
        )}
      </div>

      {!canModifyMenu && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Cashier role has view-only access to menu items. Switch to Owner or Manager to add, edit, or delete dishes.</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl">
          {(['all', 'breakfast', 'lunch', 'dinner'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {cat === 'all' ? `All (${meals.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter dishes by name..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>
      </div>

      {/* Menu Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-stone-500 dark:text-stone-400 text-xs">
                <th className="py-3 px-4 font-medium">Dish</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Macros</th>
                <th className="py-3 px-4 font-medium text-right">Price</th>
                <th className="py-3 px-4 font-medium">Availability</th>
                {canModifyMenu && <th className="py-3 px-4 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredMeals.map((meal) => {
                const isAvailable = meal.available !== false;
                return (
                  <tr key={meal.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-12 h-10 rounded-lg object-cover shrink-0 bg-stone-100 dark:bg-stone-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-stone-100 truncate max-w-[240px]">
                            {meal.name}
                          </p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-[240px]">
                            {meal.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize text-stone-700 dark:text-stone-300 font-medium">
                      {meal.category}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-stone-500 dark:text-stone-400 tabular-nums whitespace-nowrap">
                      {meal.macros.calories} kcal · {meal.macros.protein}g P
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                      ${meal.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        disabled={!canModifyMenu}
                        onClick={() => onUpdateMeal({ ...meal, available: !isAvailable })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                          isAvailable
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                        } ${canModifyMenu ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                      >
                        {isAvailable ? 'Available' : 'Sold Out'}
                      </button>
                    </td>
                    {canModifyMenu && (
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(meal)}
                            className="p-1.5 text-stone-500 hover:text-amber-700 dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                            title="Edit dish"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteMeal(meal.id)}
                            className="p-1.5 text-stone-500 hover:text-red-600 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                            title="Delete dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                {editingMeal ? 'Edit Dish Details' : 'Add New Menu Dish'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Dish Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Seared Sea Scallops & Cauliflower Purée"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Brief flavor notes and accompaniments"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-2 sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Section Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MealCategory)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="breakfast">Morning Breakfast</option>
                    <option value="lunch">Lunch Service</option>
                    <option value="dinner">Dinner Dining</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    min="50"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Select Photo Preset
                  </label>
                  <select
                    value={PHOTO_PRESETS.some((p) => p.url === image) ? image : ''}
                    onChange={(e) => {
                      if (e.target.value) setImage(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="">Custom Photo URL</option>
                    {PHOTO_PRESETS.map((p) => (
                      <option key={p.label} value={p.url}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600"
                />
                <span>Dish is currently available for ordering</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingMeal ? 'Save Changes' : 'Create Dish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
