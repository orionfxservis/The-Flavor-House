import React from 'react';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
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
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md transition-all hover:translate-y-[-1px] text-xs sm:text-[13px] whitespace-nowrap cursor-pointer"
              >
                <span>Explore Dining Menus</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <button
                onClick={onChoosePlan}
                className="px-3.5 py-2.5 glass-panel text-stone-900 dark:text-stone-100 font-semibold rounded-xl hover:bg-white dark:hover:bg-stone-800 transition-colors text-xs sm:text-[13px] whitespace-nowrap cursor-pointer"
              >
                Subscription Plans &amp; Pricing
              </button>

              {onOpenAdminDashboard && (
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-semibold rounded-xl shadow-xs transition-colors text-xs sm:text-[13px] cursor-pointer whitespace-nowrap"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-500 dark:text-amber-600 shrink-0" />
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

          {/* Right Column: Clean Culinary Hero Card matching editorial layout */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/60 dark:border-stone-800/80 bg-[#163029] group">
              <div className="aspect-4/3 w-full overflow-hidden bg-stone-900">
                <img
                  src={HERO_IMAGE}
                  alt="Pan-seared wild salmon with quinoa and roasted seasonal vegetables"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-[#163029] px-5 py-5 sm:px-6 sm:py-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#d8b467]">
                  WELCOME TO THE FLAVOR HOUSE
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mt-1">
                  Fresh Flavors. Expertly Crafted. Delivered to You.
                </h2>
                <p className="text-xs sm:text-[13px] text-stone-200/90 mt-1.5 leading-relaxed">
                  Discover chef-prepared breakfast, lunch and dinner with fresh ingredients, customizable meals and convenient delivery.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      const menuEl = document.getElementById('menu-section');
                      if (menuEl) {
                        menuEl.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onExploreMenu();
                      }
                    }}
                    className="px-4 py-2 bg-[#d8b467] hover:bg-[#caa455] text-stone-950 font-semibold text-xs sm:text-[13px] rounded-lg transition-colors cursor-pointer"
                  >
                    Order Online
                  </button>
                  <button
                    type="button"
                    onClick={onExploreMenu}
                    className="px-4 py-2 border border-[#d8b467]/75 hover:bg-white/10 text-white font-semibold text-xs sm:text-[13px] rounded-lg transition-colors cursor-pointer"
                  >
                    Explore Menu
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
