import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Lock, Tag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, SubscriptionPlan, DeliveryFrequency, DeliveryDay } from '../types/meal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: (promoCode: string, discountAmount: number) => void;
  activePlan?: SubscriptionPlan;
  isSubscriptionMode: boolean;
  setIsSubscriptionMode: (val: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
  activePlan,
  isSubscriptionMode,
  setIsSubscriptionMode
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedPromo === 'CLEAN20') {
    discount = subtotal * 0.20;
  } else if (appliedPromo === 'USAHEALTH') {
    discount = Math.min(15, subtotal);
  }

  const shippingFee = subtotal >= 75 || isSubscriptionMode ? 0 : 12.50;
  const tax = (subtotal - discount) * 0.0825; // 8.25% average US tax
  const grandTotal = Math.max(0, subtotal - discount + shippingFee + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if (code === 'CLEAN20' || code === 'USAHEALTH') {
      setAppliedPromo(code);
    } else {
      setPromoError('Invalid promo code. Try "CLEAN20" for 20% off.');
    }
  };

  const totalMealCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const targetMeals = activePlan ? activePlan.mealsPerWeek : 10;
  const progressPercent = Math.min(100, Math.round((totalMealCount / targetMeals) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200/80 dark:border-stone-800 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
              Your Gourmet Box
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {totalMealCount} meals ready for chef preparation
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subscription Target Tracker */}
        <div className="bg-stone-50 dark:bg-stone-800/60 px-5 py-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              {isSubscriptionMode ? 'Weekly Plan Capacity' : 'Order Capacity'}
            </span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">
              {totalMealCount} of {targetMeals} meals
            </span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent >= 100 ? 'bg-emerald-500' : 'bg-amber-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {totalMealCount < targetMeals && (
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1.5">
              Add {targetMeals - totalMealCount} more meals to fill your {targetMeals}-meal cold pack!
            </p>
          )}
        </div>

        {/* Itemized Meal List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <p className="text-sm">Your box is currently empty.</p>
              <p className="text-xs mt-1">Browse our weekly menu to customize chef dishes.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 flex gap-3 items-start"
              >
                <img
                  src={item.meal.image}
                  alt={item.meal.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">
                      {item.meal.name}
                    </h4>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 tabular-numbers shrink-0">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Customization Details */}
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 space-y-0.5">
                    {item.customization.portion === 'athlete' && (
                      <span className="text-amber-700 dark:text-amber-400 font-semibold block">
                        + Athlete Portion (+40% protein)
                      </span>
                    )}
                    {item.customization.carbSwap !== 'original' && (
                      <span className="block">Swap: {item.customization.carbSwap.replace('-', ' ')}</span>
                    )}
                    {item.customization.sauceOption !== 'standard' && (
                      <span className="block">Sauce: {item.customization.sauceOption.replace('-', ' ')}</span>
                    )}
                  </div>

                  {/* Quantity Stepper and Remove */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/50 dark:border-stone-700/50">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-md bg-white dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-200 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 tabular-numbers px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 rounded-md bg-white dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-200 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-stone-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                      title="Remove from box"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing Details & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-200/80 dark:border-stone-800 space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo (try CLEAN20)"
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Promo '{appliedPromo}' applied!
              </p>
            )}

            {promoError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                {promoError}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount:</span>
                  <span className="tabular-numbers">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insulated Cold-Chain Freight:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-numbers">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated US Sales Tax:</span>
                <span className="tabular-numbers">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700 font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                <span>Estimated Total:</span>
                <span className="text-amber-700 dark:text-amber-400 tabular-numbers">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onOpenCheckout(appliedPromo || '', discount)}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Stripe Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-stone-500 dark:text-stone-400">
              Encrypted 256-bit checkout · Skip or cancel anytime
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
