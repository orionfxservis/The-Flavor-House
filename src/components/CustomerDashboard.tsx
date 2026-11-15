import React, { useState } from 'react';
import { 
  UserCheck, 
  CreditCard, 
  Calendar, 
  Pause, 
  Play, 
  SkipForward, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  Sliders, 
  MapPin, 
  Flame, 
  AlertCircle,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { UserSubscription, SubscriptionPlan, MealItem, UserProfile } from '../types/meal';
import { SUBSCRIPTION_PLANS, MEALS_CATALOG } from '../data/mockMeals';

interface CustomerDashboardProps {
  subscription: UserSubscription;
  onUpdateSubscription: (newSub: UserSubscription) => void;
  onNavigateToMenu: () => void;
  onTrackOrder: (orderId: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  subscription,
  onUpdateSubscription,
  onNavigateToMenu,
  onTrackOrder,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'box-meals' | 'macros' | 'invoices' | 'settings'>('subscription');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Modal for changing plan
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseWeeks, setPauseWeeks] = useState(2);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Selected meals in next week's box
  const [nextBoxMeals, setNextBoxMeals] = useState<MealItem[]>([
    MEALS_CATALOG[0],
    MEALS_CATALOG[0],
    MEALS_CATALOG[1],
    MEALS_CATALOG[1],
    MEALS_CATALOG[2],
    MEALS_CATALOG[2],
    MEALS_CATALOG[3],
    MEALS_CATALOG[3],
    MEALS_CATALOG[4],
    MEALS_CATALOG[6]
  ]);

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === subscription.planId) || SUBSCRIPTION_PLANS[1];

  const handleSkipNextWeek = () => {
    const newStatus = subscription.status === 'skipped' ? 'active' : 'skipped';
    onUpdateSubscription({
      ...subscription,
      status: newStatus
    });
    setActionNotice(newStatus === 'skipped' ? 'Next week delivery skipped. You will not be billed on Nov 12.' : 'Delivery resumed for next week.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleConfirmPause = () => {
    onUpdateSubscription({
      ...subscription,
      status: 'paused',
      pausedUntilDate: `Paused for ${pauseWeeks} weeks`
    });
    setShowPauseModal(false);
    setActionNotice(`Subscription paused for ${pauseWeeks} weeks. Deliveries will resume automatically afterwards.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleResumeSubscription = () => {
    onUpdateSubscription({
      ...subscription,
      status: 'active',
      pausedUntilDate: undefined
    });
    setActionNotice('Subscription resumed! Your next delivery is scheduled for Sunday.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleChangePlan = (newPlanId: string) => {
    onUpdateSubscription({
      ...subscription,
      planId: newPlanId
    });
    setShowChangePlanModal(false);
    setActionNotice(`Successfully upgraded plan to ${SUBSCRIPTION_PLANS.find((p) => p.id === newPlanId)?.name}!`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRemoveMealFromBox = (index: number) => {
    const updated = [...nextBoxMeals];
    updated.splice(index, 1);
    setNextBoxMeals(updated);
  };

  const handleAddMealToBox = (meal: MealItem) => {
    if (nextBoxMeals.length >= currentPlan.mealsPerWeek) {
      setActionNotice(`Your box is full (${currentPlan.mealsPerWeek} meals). Remove a meal first to swap.`);
      setTimeout(() => setActionNotice(null), 3000);
      return;
    }
    setNextBoxMeals([...nextBoxMeals, meal]);
  };

  // Calculate box averages
  const avgCalories = Math.round(nextBoxMeals.reduce((acc, m) => acc + m.macros.calories, 0) / (nextBoxMeals.length || 1));
  const avgProtein = Math.round(nextBoxMeals.reduce((acc, m) => acc + m.macros.protein, 0) / (nextBoxMeals.length || 1));
  const avgCarbs = Math.round(nextBoxMeals.reduce((acc, m) => acc + m.macros.carbs, 0) / (nextBoxMeals.length || 1));
  const avgFat = Math.round(nextBoxMeals.reduce((acc, m) => acc + m.macros.fat, 0) / (nextBoxMeals.length || 1));

  const pastInvoices = [
    { id: 'INV-2026-1105', date: 'Nov 5, 2026', total: 132.00, items: 10, status: 'Paid via Stripe', orderId: 'CC-98241' },
    { id: 'INV-2026-1029', date: 'Oct 29, 2026', total: 132.00, items: 10, status: 'Paid via Stripe', orderId: 'CC-97184' },
    { id: 'INV-2026-1022', date: 'Oct 22, 2026', total: 132.00, items: 10, status: 'Paid via Stripe', orderId: 'CC-96022' },
  ];

  return (
    <section id="dashboard-section" className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>Customer Portal</span>
              <span aria-hidden="true">·</span>
              <span>Subscriber ID: #{subscription.id}</span>
              {currentUser && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Email
                  </span>
                </>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {currentUser ? `Welcome back, ${currentUser.name}` : 'Subscription & Account Dashboard'}
            </h2>
            {currentUser ? (
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Account Email: <strong className="text-stone-800 dark:text-stone-200">{currentUser.email}</strong>
              </p>
            ) : (
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Guest session active. Sign in to sync your dining history across devices.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-semibold border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Sign In / Register
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">Plan:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                subscription.status === 'active'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : subscription.status === 'paused'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}>
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200/80 dark:border-stone-800 pb-2 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'subscription', label: 'Subscription Plan' },
            { id: 'box-meals', label: `Next Box Selection (${nextBoxMeals.length}/${currentPlan.mealsPerWeek})` },
            { id: 'macros', label: 'Macro Tracker' },
            { id: 'invoices', label: 'Billing & Invoices' },
            { id: 'settings', label: 'Delivery Address & Stripe' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Subscription Management */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Active Plan Details */}
              <div className="glass-panel p-6 rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800">
                <span className="text-xs uppercase font-semibold text-stone-400 block mb-1">Current Tier</span>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                  {currentPlan.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {currentPlan.mealsPerWeek} chef meals delivered every {subscription.frequency}
                </p>
                <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-stone-800 flex items-baseline justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Weekly Rate:</span>
                  <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 tabular-numbers">
                    ${currentPlan.weeklyTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setShowChangePlanModal(true)}
                  className="w-full mt-4 py-2 px-3 text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl transition-colors cursor-pointer"
                >
                  Change Meal Plan
                </button>
              </div>

              {/* Card 2: Next Delivery Schedule */}
              <div className="glass-panel p-6 rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800">
                <span className="text-xs uppercase font-semibold text-stone-400 block mb-1">Upcoming Box</span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                    {subscription.status === 'paused' ? 'Currently Paused' : subscription.status === 'skipped' ? 'Skipped for Next Week' : subscription.nextDeliveryDate}
                  </h3>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                  Delivery Window: {subscription.deliveryDay}s, 11:30 AM - 1:00 PM EST
                </p>
                <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-stone-800 flex items-baseline justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Menu Customization Cutoff:</span>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">Wednesdays 11:59 PM</span>
                </div>
                <button
                  onClick={() => onTrackOrder('CC-98241')}
                  className="w-full mt-4 py-2 px-3 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors cursor-pointer"
                >
                  Track In-Transit Box Now
                </button>
              </div>

              {/* Card 3: Stripe Recurring Billing */}
              <div className="glass-panel p-6 rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800">
                <span className="text-xs uppercase font-semibold text-stone-400 block mb-1">Stripe Auto-Billing</span>
                <div className="flex items-center gap-2 mt-1">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span className="font-mono text-sm font-semibold text-stone-800 dark:text-stone-200">•••• 4242 (Visa)</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                  Next charge of ${currentPlan.weeklyTotal.toFixed(2)} scheduled for {subscription.nextBillingDate}
                </p>
                <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-stone-800 flex items-baseline justify-between text-xs">
                  <span className="text-stone-500">Billing Cadence:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 capitalize">{subscription.frequency}</span>
                </div>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full mt-4 py-2 px-3 text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl transition-colors cursor-pointer"
                >
                  Manage Payment Method
                </button>
              </div>

            </div>

            {/* Quick Actions Bar */}
            <div className="glass-panel p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  Subscription Controls
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Control your deliveries with total flexibility. Zero penalty for pausing or skipping.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Skip Next Delivery */}
                <button
                  onClick={handleSkipNextWeek}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                >
                  <SkipForward className="w-4 h-4 text-amber-600" />
                  <span>{subscription.status === 'skipped' ? 'Undo Skip (Resume)' : 'Skip Next Delivery'}</span>
                </button>

                {/* Pause or Resume */}
                {subscription.status === 'paused' ? (
                  <button
                    onClick={handleResumeSubscription}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>Resume Subscription</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPauseModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                  >
                    <Pause className="w-4 h-4 text-amber-600" />
                    <span>Pause Plan</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel your The Flavor House subscription? You can pause instead with zero fees.')) {
                      onUpdateSubscription({ ...subscription, status: 'paused' });
                      setActionNotice('Subscription successfully paused. You will not be billed.');
                    }
                  }}
                  className="text-xs text-stone-400 hover:text-red-500 font-medium px-2 py-1 transition-colors cursor-pointer"
                >
                  Cancel Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Next Box Meal Selection */}
        {activeTab === 'box-meals' && (
          <div className="space-y-6">
            <div className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Customize Your Next Delivery Box
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Allocated capacity: {nextBoxMeals.length} of {currentPlan.mealsPerWeek} chef meals chosen.
                </p>
              </div>
              <button
                onClick={onNavigateToMenu}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Browse Full Catalog to Swap
              </button>
            </div>

            {/* Currently selected meals in next box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nextBoxMeals.map((meal, idx) => (
                <div
                  key={`${meal.id}-${idx}`}
                  className="glass-panel p-3.5 rounded-2xl flex items-center justify-between gap-3 border border-stone-200 dark:border-stone-800"
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                      {meal.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 tabular-numbers">
                      {meal.macros.calories} kcal · {meal.macros.protein}g protein
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveMealFromBox(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                    title="Remove meal to swap with another"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Available meals to add */}
            {nextBoxMeals.length < currentPlan.mealsPerWeek && (
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3">
                  Click to Add to Your Box ({currentPlan.mealsPerWeek - nextBoxMeals.length} slots remaining):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {MEALS_CATALOG.slice(0, 4).map((m) => (
                    <button
                      key={`add-${m.id}`}
                      onClick={() => handleAddMealToBox(m)}
                      className="p-3 glass-panel rounded-xl text-left hover:border-amber-600 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-600 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block truncate">
                          {m.name}
                        </span>
                        <span className="text-[10px] text-stone-500 tabular-numbers">
                          {m.macros.calories} kcal
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Macro Tracker */}
        {activeTab === 'macros' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
                Weekly Box Macro Nutrition Profile
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                Based on your selected {nextBoxMeals.length} meals scheduled for the upcoming Sunday delivery.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-stone-100 dark:bg-stone-800/70 p-4 rounded-2xl">
                  <span className="text-xs text-stone-500 dark:text-stone-400 block">Avg Calories / Meal</span>
                  <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                    {avgCalories}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">Goal: 500 kcal</span>
                </div>

                <div className="bg-stone-100 dark:bg-stone-800/70 p-4 rounded-2xl">
                  <span className="text-xs text-stone-500 dark:text-stone-400 block">Avg Protein / Meal</span>
                  <span className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 tabular-numbers">
                    {avgProtein}g
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">High protein target</span>
                </div>

                <div className="bg-stone-100 dark:bg-stone-800/70 p-4 rounded-2xl">
                  <span className="text-xs text-stone-500 dark:text-stone-400 block">Avg Clean Carbs</span>
                  <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                    {avgCarbs}g
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">Complex low-GI</span>
                </div>

                <div className="bg-stone-100 dark:bg-stone-800/70 p-4 rounded-2xl">
                  <span className="text-xs text-stone-500 dark:text-stone-400 block">Avg Healthy Fats</span>
                  <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-numbers">
                    {avgFat}g
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">Avocado & olive oils</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Invoices & Receipts */}
        {activeTab === 'invoices' && (
          <div className="glass-panel rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 dark:border-stone-800">
            <div className="p-6 border-b border-stone-200/80 dark:border-stone-800">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Stripe Billing History & Tax Invoices
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Download itemized invoices for corporate wellness expense reports or tax tracking.
              </p>
            </div>

            <div className="divide-y divide-stone-200/80 dark:divide-stone-800 text-xs">
              {pastInvoices.map((inv) => (
                <div key={inv.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100 block">
                      {inv.id}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400">
                      Billed {inv.date} · {inv.items} Meals Box
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-stone-900 dark:text-stone-100 block text-sm tabular-numbers">
                      ${inv.total.toFixed(2)}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                      {inv.status}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="p-2 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    title="View Receipt"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Delivery Address & Stripe Settings */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Delivery address */}
            <div className="glass-panel p-6 rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Default Delivery Address
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-stone-500 block mb-1">Street Address</label>
                  <input
                    type="text"
                    defaultValue="742 Magazine St, Suite 300"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-stone-500 block mb-1">City & State</label>
                    <input
                      type="text"
                      defaultValue="New Orleans, LA"
                      className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 block mb-1">ZIP Code</label>
                    <input
                      type="text"
                      defaultValue="70112"
                      className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-stone-500 block mb-1">Delivery Gate Code / Instructions</label>
                  <input
                    type="text"
                    defaultValue="Gate Code #4921. Leave inside glass foyer."
                    className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActionNotice('Delivery address saved successfully!');
                    setTimeout(() => setActionNotice(null), 3000);
                  }}
                  className="mt-2 py-2 px-4 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Address Changes
                </button>
              </div>
            </div>

            {/* Payment Method on File */}
            <div className="glass-panel p-6 rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                Stripe Payment Method
              </h3>
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-6 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-[10px]">
                      VISA
                    </div>
                    <div>
                      <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                        •••• •••• •••• 4242
                      </span>
                      <span className="text-stone-400 block text-[11px]">Expires 12/28</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600">Default for Renewals</span>
                </div>
                <p className="text-stone-500 dark:text-stone-400">
                  Your card is automatically billed every Wednesday for your selected meal plan.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActionNotice('Stripe Payment update modal dispatched to your verified email.');
                    setTimeout(() => setActionNotice(null), 3000);
                  }}
                  className="py-2 px-4 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl font-semibold text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  Update Card via Stripe
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Change Plan Modal */}
      {showChangePlanModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50 mb-2">
              Select New Subscription Plan
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
              Your new meal allocation and billing rate will take effect on the upcoming billing cycle.
            </p>
            <div className="space-y-3">
              {SUBSCRIPTION_PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleChangePlan(p.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                    subscription.planId === p.id
                      ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-600'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100 block">
                      {p.name} ({p.mealsPerWeek} meals/wk)
                    </span>
                    <span className="text-xs text-stone-500">${p.weeklyTotal.toFixed(2)}/week</span>
                  </div>
                  {subscription.planId === p.id && (
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowChangePlanModal(false)}
              className="w-full mt-4 py-2 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pause Plan Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50 mb-2">
              Pause Deliveries
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
              Taking a break or traveling? Pause for up to 4 weeks with zero charges.
            </p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[1, 2, 3, 4].map((wk) => (
                <button
                  key={wk}
                  onClick={() => setPauseWeeks(wk)}
                  className={`py-3 rounded-xl border text-center font-bold text-xs cursor-pointer ${
                    pauseWeeks === wk
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {wk} {wk === 1 ? 'Week' : 'Weeks'}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPauseModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 cursor-pointer"
              >
                Keep Active
              </button>
              <button
                onClick={handleConfirmPause}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Confirm Pause
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-start border-b border-stone-200 dark:border-stone-800 pb-4 mb-4">
              <div>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase">Tax Invoice</span>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">{selectedInvoice.id}</h3>
                <p className="text-xs text-stone-500">Issued by The Flavor House LLC (USA)</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="p-1 text-stone-400 hover:text-stone-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500">Billed Date:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono text-stone-900 dark:text-stone-100">{selectedInvoice.orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500">Payment Gateway:</span>
                <span className="text-stone-900 dark:text-stone-100">Stripe Automated Billing (ch_912409)</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold text-stone-900 dark:text-stone-50">
                <span>Amount Paid:</span>
                <span className="text-amber-700 dark:text-amber-400 tabular-numbers">${selectedInvoice.total.toFixed(2)} USD</span>
              </div>
            </div>
            <button
              onClick={() => {
                alert('Receipt downloaded to your device as PDF.');
                setSelectedInvoice(null);
              }}
              className="w-full mt-5 py-2.5 bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white font-semibold rounded-xl text-xs cursor-pointer"
            >
              Download PDF Tax Receipt
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
