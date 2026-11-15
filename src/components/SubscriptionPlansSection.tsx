import React, { useState } from 'react';
import { Check, ShieldCheck, Calendar, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockMeals';
import { SubscriptionPlan, DeliveryFrequency, DeliveryDay } from '../types/meal';

interface SubscriptionPlansSectionProps {
  onSelectPlan: (plan: SubscriptionPlan, frequency: DeliveryFrequency, day: DeliveryDay) => void;
}

export const SubscriptionPlansSection: React.FC<SubscriptionPlansSectionProps> = ({ onSelectPlan }) => {
  const [selectedFrequency, setSelectedFrequency] = useState<DeliveryFrequency>('weekly');
  const [selectedDay, setSelectedDay] = useState<DeliveryDay>('Sunday');

  // Discount calculation based on frequency
  const discountMultiplier = selectedFrequency === 'weekly' ? 0.85 : 1.0;

  return (
    <section id="plans-section" className="py-10 sm:py-14 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
            <span>Flexible Recurring Subscriptions</span>
            <span aria-hidden="true">·</span>
            <span>Zero Commitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            Choose Your Weekly Meal Routine
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2">
            Chef-cooked gourmet meals delivered on your chosen schedule. Powered by Stripe recurring payments with 1-click pause, skip, or cancellation anytime.
          </p>
        </div>

        {/* Cadence & Frequency Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Frequency selector buttons */}
          <div className="flex flex-wrap items-center justify-center p-1 bg-stone-200/80 dark:bg-stone-800/80 rounded-xl">
            {(
              [
                { id: 'weekly', label: 'Every Week (15% Off)' },
                { id: 'bi-weekly', label: 'Every 2 Weeks' },
                { id: 'monthly', label: 'Monthly Delivery' },
              ] as const
            ).map((freq) => (
              <button
                key={freq.id}
                onClick={() => setSelectedFrequency(freq.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedFrequency === freq.id
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>

          {/* Delivery Day Picker */}
          <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="font-medium">Delivery Day:</span>
            <div className="flex items-center gap-1">
              {(['Sunday', 'Tuesday', 'Thursday'] as const).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs font-medium ${
                    selectedDay === day
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Tier Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const calculatedTotal = plan.weeklyTotal * discountMultiplier;
            const perMeal = calculatedTotal / plan.mealsPerWeek;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'glass-panel ring-2 ring-amber-600 shadow-2xl md:scale-[1.02] bg-white/90 dark:bg-stone-900/90'
                    : 'glass-panel hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-amber-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="text-xs uppercase font-semibold tracking-wider text-stone-500 dark:text-stone-400">
                    {plan.mealsPerWeek} Gourmet Meals / Box
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50 mt-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="mt-5 pb-5 border-b border-stone-200/60 dark:border-stone-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                        ${perMeal.toFixed(2)}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        / meal
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      <span className="font-semibold text-stone-800 dark:text-stone-200 tabular-numbers">
                        ${calculatedTotal.toFixed(2)}
                      </span>{' '}
                      billed {selectedFrequency === 'weekly' ? 'weekly' : selectedFrequency} via Stripe
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-8 mt-6">
                  <button
                    onClick={() => onSelectPlan(plan, selectedFrequency, selectedDay)}
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg'
                        : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white'
                    }`}
                  >
                    <span>Start {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-stone-500 dark:text-stone-400 mt-2.5">
                    Skip or cancel anytime before cutoff
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Subscription Guarantees Bar */}
        <div className="mt-14 glass-panel p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-100 block text-sm">
                1-Click Pause & Skip
              </span>
              <span>Going on vacation or traveling? Pause deliveries for up to 4 weeks with zero penalty or fees.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-100 block text-sm">
                Stripe Automated Recurring Billing
              </span>
              <span>Automated weekly billing on Wednesdays. Instant digital itemized receipts stored in your dashboard.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-100 block text-sm">
                100% Chef Taste Guarantee
              </span>
              <span>If any chef dish does not meet your high culinary standard, we credit your next delivery instantly.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
