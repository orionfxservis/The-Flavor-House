import React from 'react';
import { ArrowRight, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockMeals';
import { AdminUser } from '../types/admin';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onChoosePlan: () => void;
  onOpenAdminDashboard?: () => void;
  adminUser?: AdminUser | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreMenu, 
  onChoosePlan,
  onOpenAdminDashboard,
  adminUser
}) => {
  return (
    <section className="relative pt-8 sm:pt-10 pb-10 sm:pb-14 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-Column Split: Editorial Value Pitch & Plated Dish Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.14] text-balance">
              The Flavor House – Gourmet Healthy Meals, Freshly Prepared &amp; Delivered
            </h1>

            <p className="text-base sm:text-lg font-semibold text-stone-800 dark:text-stone-100 leading-snug max-w-2xl">
              Enjoy gourmet healthy dining, expertly prepared by Master Chefs &amp; delivered fresh to your door.
            </p>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              The Flavor House brings together exceptional taste and balanced nutrition with chef-crafted meals made from fresh, high-quality ingredients. Explore our delicious selection of breakfast, lunch, dinner and healthy meal options, featuring organic produce, wild-caught seafood and premium grass-fed meats. Customize your meals, choose your preferred portions and enjoy convenient home delivery with flexible weekly meal subscriptions. Experience restaurant-quality dining, personalized to your taste and lifestyle.
            </p>

            {/* Direct Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md transition-all hover:translate-y-[-1px] text-sm sm:text-base cursor-pointer"
              >
                <span>Explore Dining Menus</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onChoosePlan}
                className="px-6 py-3.5 glass-panel text-stone-900 dark:text-stone-100 font-semibold rounded-xl hover:bg-white dark:hover:bg-stone-800 transition-colors text-sm sm:text-base cursor-pointer"
              >
                Subscription Plans & Pricing
              </button>

              {onOpenAdminDashboard && (
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center gap-2 px-5 py-3.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-semibold rounded-xl shadow-xs transition-colors text-sm sm:text-base cursor-pointer whitespace-nowrap"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-500 dark:text-amber-600" />
                  <span>{adminUser ? `Dashboard (${adminUser.role})` : 'Login to Dashboard'}</span>
                </button>
              )}
            </div>

            {/* Key Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                  450,000+
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Meals Served Nationwide
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                  4.9 / 5.0
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Customer Satisfaction
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  48 States
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Insulated Cold Delivery
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Hero Culinary Card with Glass Overlays */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/50 dark:border-stone-800/80 aspect-4/3 lg:aspect-square group">
              <img
                src={HERO_IMAGE}
                alt="Pan-seared wild salmon with roasted asparagus and tricolor quinoa"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />

              {/* Floating Top Glass Tag */}
              <div className="absolute top-4 left-4 glass-panel px-3.5 py-1.5 rounded-full text-xs font-semibold text-stone-900 dark:text-stone-100 shadow-lg">
                Fresh Catch · Wild Alaskan King Salmon
              </div>

              {/* Floating Bottom Glass Nutrition Spec */}
              <div className="absolute bottom-4 inset-x-4 glass-panel p-4 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 dark:text-stone-50 text-base">
                      Pan-Seared King Salmon
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Lemon dill reduction & tricolor Andean quinoa
                    </p>
                  </div>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-400 tabular-numbers">
                    $17.95
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/40 dark:border-stone-700/50 grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <span className="block text-[11px] text-stone-500 dark:text-stone-400">Calories</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">490</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-500 dark:text-stone-400">Protein</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">44g</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-500 dark:text-stone-400">Carbs</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">26g</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-500 dark:text-stone-400">Fats</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">22g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Seal Accent */}
            <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-4 sm:left-4 glass-panel px-4 py-2 rounded-xl shadow-lg inline-flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Certified Organic & Non-GMO</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
