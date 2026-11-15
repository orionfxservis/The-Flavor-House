import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, ArrowRight, Truck } from 'lucide-react';
import { CartItem, SubscriptionPlan, DeliveryFrequency, DeliveryDay } from '../types/meal';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  finalTotal: number;
  promoCode: string;
  isSubscription: boolean;
  subscriptionPlan?: SubscriptionPlan;
  frequency?: DeliveryFrequency;
  deliveryDay?: DeliveryDay;
  onPaymentSuccess: (orderId: string, receiptData: any) => void;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  shippingFee,
  tax,
  finalTotal,
  promoCode,
  isSubscription,
  subscriptionPlan,
  frequency = 'weekly',
  deliveryDay = 'Sunday',
  onPaymentSuccess
}) => {
  if (!isOpen) return null;

  // Form states
  const [cardName, setCardName] = useState('Dr. Alex Montgomery');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [billingZip, setBillingZip] = useState('70112');
  const [address, setAddress] = useState('742 Magazine St, Suite 300');
  const [city, setCity] = useState('New Orleans');
  const [state, setState] = useState('LA');
  const [agreeRecurring, setAgreeRecurring] = useState(true);

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format expiry with slash
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardExp(val);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscription && !agreeRecurring) {
      setErrorMessage('Please accept the recurring subscription billing authorization terms.');
      return;
    }
    setErrorMessage('');
    setPaymentStatus('processing');

    // Simulate Stripe payment intent confirmation & webhooks
    setTimeout(() => {
      const generatedOrderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
      setPaymentStatus('success');

      const receipt = {
        orderId: generatedOrderId,
        total: finalTotal,
        itemsCount: cartItems.length,
        deliveryDay,
        frequency,
        cardLast4: cardNumber.replace(/\s/g, '').slice(-4) || '4242',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setTimeout(() => {
        onPaymentSuccess(generatedOrderId, receipt);
      }, 1400);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="p-6 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
                Secure Stripe Checkout
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                End-to-End 256-Bit Encrypted · PCI-DSS Level 1 Compliant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentStatus === 'success' ? (
          /* Payment Confirmed State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
              Payment & Subscription Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
              Your gourmet cold-box order has been routed to our executive kitchen. Your card ending in {cardNumber.slice(-4) || '4242'} was charged ${finalTotal.toFixed(2)}.
            </p>
            <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl text-xs text-left max-w-sm mx-auto space-y-1.5 tabular-numbers">
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Stripe Charge ID:</span>
                <span className="font-mono text-stone-700 dark:text-stone-300">ch_3N{Math.random().toString(36).substring(7)}</span>
              </div>
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>First Delivery:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{deliveryDay}, 11:30 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Recurring Schedule:</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">Every {frequency}</span>
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Redirecting you to Live Real-Time Delivery Tracking...
            </p>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handleProcessPayment} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Express Checkout Options (Apple Pay & Google Pay) */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                Express 1-Click Checkout
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentStatus('processing');
                    setTimeout(() => {
                      onPaymentSuccess(`CC-${Math.floor(100000 + Math.random() * 900000)}`, {
                        total: finalTotal,
                        cardLast4: 'ApplePay'
                      });
                    }, 1500);
                  }}
                  className="py-2.5 px-3 bg-black hover:bg-stone-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="font-sans font-bold">Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentStatus('processing');
                    setTimeout(() => {
                      onPaymentSuccess(`CC-${Math.floor(100000 + Math.random() * 900000)}`, {
                        total: finalTotal,
                        cardLast4: 'GPay'
                      });
                    }, 1500);
                  }}
                  className="py-2.5 px-3 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 text-stone-800 dark:text-stone-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>G Pay</span>
                </button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200 dark:border-stone-800" />
                </div>
                <div className="relative flex justify-center text-[11px]">
                  <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 uppercase">
                    Or pay with credit / debit card
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary Snapshot */}
            <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-stone-900 dark:text-stone-100">
                <span>{isSubscription ? `Subscription Box (${cartItems.length} Chef Meals)` : `Order (${cartItems.length} Meals)`}</span>
                <span className="tabular-numbers">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Promo Code Discount ({promoCode}):</span>
                  <span className="tabular-numbers">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Insulated Cold Delivery (48 US States):</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Estimated Sales Tax:</span>
                <span className="tabular-numbers">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between font-serif font-bold text-base text-stone-900 dark:text-stone-50">
                <span>Total Due Now:</span>
                <span className="text-amber-700 dark:text-amber-400 tabular-numbers">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Delivery Destination Address */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                US Delivery Street Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address & Apt/Suite"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/40"
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                />
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                />
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value)}
                  placeholder="ZIP"
                  className="px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            {/* Stripe Card Element Box */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Payment Card Details
              </label>

              {/* Cardholder name */}
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Cardholder Full Name"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/40"
              />

              {/* Card number with brand indicator */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4242 4242 4242 4242"
                  className="w-full pl-3 pr-10 py-2 text-xs sm:text-sm font-mono bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/40 tabular-numbers"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>

              {/* Expiry and CVC */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={cardExp}
                  onChange={handleExpChange}
                  placeholder="MM / YY"
                  className="px-3 py-2 text-xs sm:text-sm font-mono bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/40 tabular-numbers"
                />
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                  placeholder="CVC"
                  className="px-3 py-2 text-xs sm:text-sm font-mono bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500/40 tabular-numbers"
                />
              </div>
            </div>

            {/* Recurring Billing Consent Checkbox */}
            {isSubscription && (
              <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 dark:text-stone-300">
                  <input
                    type="checkbox"
                    checked={agreeRecurring}
                    onChange={(e) => setAgreeRecurring(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>
                    <strong>Recurring Subscription Terms:</strong> I authorize The Flavor House to bill my payment method ${finalTotal.toFixed(2)} on a recurring {frequency} basis. I understand I can pause deliveries, skip weeks, or cancel anytime with 1-click in my Customer Dashboard before the weekly cutoff.
                  </span>
                </label>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={paymentStatus === 'processing'}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing via Stripe Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay & Start Subscription · ${finalTotal.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 dark:text-stone-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Stripe Verified Merchant
              </span>
              <span>·</span>
              <span>Cancel or Pause Anytime</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
