import React, { useState, useEffect } from 'react';
import { 
  CartItem, 
  MealItem, 
  CustomizationOption, 
  SubscriptionPlan, 
  DeliveryFrequency, 
  DeliveryDay, 
  UserSubscription,
  AppNotification,
  UserProfile,
  BlogPost
} from './types/meal';
import {
  AdminUser,
  RestaurantOrder,
  RestaurantOrderStatus,
  RestaurantTable,
  TableStatus,
  TableReservation,
  StaffMember,
  ExpenseEntry,
  CustomerRecord,
  TestimonialItem
} from './types/admin';
import { 
  MEALS_CATALOG, 
  SUBSCRIPTION_PLANS, 
  INITIAL_USER_SUBSCRIPTION, 
  INITIAL_NOTIFICATIONS, 
  CHEF_KITCHEN_IMAGE,
  BLOG_POSTS
} from './data/mockMeals';
import {
  INITIAL_RESTAURANT_ORDERS,
  INITIAL_TABLES,
  INITIAL_RESERVATIONS,
  INITIAL_STAFF,
  INITIAL_EXPENSES,
  INITIAL_CUSTOMERS,
  INITIAL_TESTIMONIALS
} from './data/mockAdmin';
import { getActiveSession, setActiveSession } from './utils/authStorage';

import { Header } from './components/Header';
import { BackgroundFoodScroller } from './components/BackgroundFoodScroller';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { CustomMealBuilder } from './components/CustomMealBuilder';
import { SubscriptionPlansSection } from './components/SubscriptionPlansSection';
import { MealCustomizerModal } from './components/MealCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { StripeCheckoutModal } from './components/StripeCheckoutModal';
import { LiveDeliveryTracker } from './components/LiveDeliveryTracker';
import { CustomerDashboard } from './components/CustomerDashboard';
import { PushNotificationManager } from './components/PushNotificationManager';
import { AuthModal } from './components/AuthModal';
import { BlogsSection } from './components/BlogsSection';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/Footer';
import { Bell, Star, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation View: 'home' | 'menu' | 'builder' | 'plans' | 'tracker' | 'dashboard' | 'admin-dashboard'
  const [activeView, setActiveView] = useState('home');

  // Theme State (Dark / Light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-1',
      meal: MEALS_CATALOG[0], // Breakfast Avocado Tartine
      quantity: 1,
      customization: {
        portion: 'standard',
        carbSwap: 'original',
        sauceOption: 'standard',
        dietaryExclusions: []
      },
      unitPrice: 16.50
    },
    {
      cartItemId: 'init-2',
      meal: MEALS_CATALOG[4], // Wagyu Burger
      quantity: 1,
      customization: {
        portion: 'standard',
        carbSwap: 'sweet-potato',
        sauceOption: 'on-the-side',
        dietaryExclusions: []
      },
      unitPrice: 21.50
    },
    {
      cartItemId: 'init-3',
      meal: MEALS_CATALOG[8], // 12-Hour Braised Short Rib
      quantity: 1,
      customization: {
        portion: 'standard',
        carbSwap: 'original',
        sauceOption: 'standard',
        dietaryExclusions: ['Gluten-Free']
      },
      unitPrice: 34.00
    }
  ]);

  // Subscription State
  const [subscription, setSubscription] = useState<UserSubscription>(INITIAL_USER_SUBSCRIPTION);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[1]);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<DeliveryFrequency>('weekly');
  const [subscriptionDeliveryDay, setSubscriptionDeliveryDay] = useState<DeliveryDay>('Sunday');
  const [isSubscriptionCheckout, setIsSubscriptionCheckout] = useState(true);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getActiveSession());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');

  // Modals & Drawers
  const [customizingMeal, setCustomizingMeal] = useState<MealItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toastNotification, setToastNotification] = useState<AppNotification | null>(null);

  // Admin Operations Dashboard State (live synced with storefront)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [meals, setMeals] = useState<MealItem[]>(MEALS_CATALOG);
  const [adminOrders, setAdminOrders] = useState<RestaurantOrder[]>(INITIAL_RESTAURANT_ORDERS);
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [reservations, setReservations] = useState<TableReservation[]>(INITIAL_RESERVATIONS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(INITIAL_EXPENSES);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);

  const handleOpenAdminDashboard = () => {
    if (adminUser) {
      setActiveView('admin-dashboard');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setActiveView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setActiveView('home');
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    const welcomeNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Welcome, ${user.name}! 🌟`,
      message: 'You are now signed in with your verified email. Your dining preferences are active.',
      timestamp: 'Just now',
      type: 'subscription',
      read: false,
      actionUrl: '#dashboard'
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
    showToast(welcomeNotif);
  };

  const handleLogout = () => {
    setActiveSession(null);
    setCurrentUser(null);
    const logoutNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Signed Out',
      message: 'You have safely signed out of your The Flavor House account on this device.',
      timestamp: 'Just now',
      type: 'subscription',
      read: false
    };
    setNotifications((prev) => [logoutNotif, ...prev]);
    showToast(logoutNotif);
  };

  // Initialize Theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Cart operations
  const handleAddToCart = (meal: MealItem, customization: CustomizationOption, finalPrice: number) => {
    const newItem: CartItem = {
      cartItemId: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      meal,
      quantity: 1,
      customization,
      unitPrice: finalPrice
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (meal: MealItem) => {
    const standardCustom: CustomizationOption = {
      portion: 'standard',
      carbSwap: 'original',
      sauceOption: 'standard',
      dietaryExclusions: []
    };
    handleAddToCart(meal, standardCustom, meal.price);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Plan Selection trigger
  const handleSelectPlan = (plan: SubscriptionPlan, freq: DeliveryFrequency, day: DeliveryDay) => {
    setSelectedPlanForCheckout(plan);
    setSubscriptionFrequency(freq);
    setSubscriptionDeliveryDay(day);
    setIsSubscriptionCheckout(true);
    setIsCartOpen(true);
  };

  // Open Checkout
  const handleOpenCheckout = (promo: string, discountAmount: number) => {
    setAppliedPromo(promo);
    setAppliedDiscount(discountAmount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Payment completed
  const handlePaymentSuccess = (orderId: string, receiptData: any) => {
    setIsCheckoutOpen(false);
    setCartItems([]);

    // Update active user subscription
    setSubscription({
      ...subscription,
      id: `sub_${orderId}`,
      planId: selectedPlanForCheckout.id,
      status: 'active',
      frequency: subscriptionFrequency,
      deliveryDay: subscriptionDeliveryDay,
      nextDeliveryDate: `${subscriptionDeliveryDay}, Nov 16, 2026`
    });

    // Create Push Notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Order Confirmed & Payment Succeeded 💳',
      message: `Your Stripe transaction of $${receiptData.total.toFixed(2)} was verified. Your executive chef box is being prepared for ${subscriptionDeliveryDay}.`,
      timestamp: 'Just now',
      type: 'order',
      read: false,
      actionUrl: '#tracker'
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(newNotif);

    // Navigate to Live Tracker
    setActiveView('tracker');
  };

  // Push notification helper
  const showToast = (notif: AppNotification) => {
    setToastNotification(notif);
    setTimeout(() => {
      setToastNotification(null);
    }, 6000);
  };

  const handleTriggerSimulatedNotification = (type: 'delivery' | 'order' | 'promotion') => {
    let mock: AppNotification;
    if (type === 'delivery') {
      mock = {
        id: `sim-${Date.now()}`,
        title: 'Sprinter Cold-Van Dispatched 🚚',
        message: 'Driver Marcus Tremaine is en route with your refrigerated meal box at 35.8°F. ETA: 45 minutes.',
        timestamp: 'Just now',
        type: 'delivery',
        read: false,
        actionUrl: '#tracker'
      };
    } else if (type === 'order') {
      mock = {
        id: `sim-${Date.now()}`,
        title: 'Weekly Menu Refreshed 🍴',
        message: '8 brand new chef specials have just dropped! Explore the Wild King Salmon and Filet Mignon.',
        timestamp: 'Just now',
        type: 'order',
        read: false,
        actionUrl: '#menu'
      };
    } else {
      mock = {
        id: `sim-${Date.now()}`,
        title: 'Exclusive Subscriber 20% Off Code 🎁',
        message: 'Use VIP promo code CLEAN20 at checkout for 20% off your next nationwide cold delivery.',
        timestamp: 'Just now',
        type: 'promotion',
        read: false,
        actionUrl: '#plans'
      };
    }

    setNotifications((prev) => [mock, ...prev]);
    showToast(mock);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal >= 75 || isSubscriptionCheckout ? 0 : 12.50;
  const tax = (subtotal - appliedDiscount) * 0.0825;
  const grandTotal = Math.max(0, subtotal - appliedDiscount + shippingFee + tax);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 relative selection:bg-amber-500/20 selection:text-amber-900">
      
      {/* Background Smooth Food Scroller & Ambient Lighting (Storefront views only) */}
      {activeView !== 'admin-dashboard' && <BackgroundFoodScroller />}

      {/* Main Top Bar Header (Storefront views only) */}
      {activeView !== 'admin-dashboard' && (
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          unreadNotifications={unreadCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onOpenDashboard={() => setActiveView('dashboard')}
          currentUser={currentUser}
          onOpenAuth={() => handleOpenAuth('signin')}
          onLogout={handleLogout}
        />
      )}

      {/* Live Push Notification Floating Toast */}
      {toastNotification && (
        <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-8 z-50 sm:max-w-sm glass-panel p-4 rounded-2xl shadow-2xl border-l-4 border-amber-600 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-600" />
                {toastNotification.title}
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {toastNotification.message}
              </p>
            </div>
            <button
              onClick={() => setToastNotification(null)}
              className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              ×
            </button>
          </div>
          {toastNotification.actionUrl && (
            <button
              onClick={() => {
                if (toastNotification.actionUrl === '#tracker') setActiveView('tracker');
                if (toastNotification.actionUrl === '#menu') setActiveView('menu');
                if (toastNotification.actionUrl === '#plans') setActiveView('plans');
                setToastNotification(null);
              }}
              className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Open Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Primary Content View Switcher */}
      <main className="relative z-10">
        
        {/* VIEW 1: HOME (Hero + Full Showcase + Menus + Testimonials) */}
        {activeView === 'home' && (
          <>
            <HeroSection
              onExploreMenu={() => setActiveView('menu')}
              onChoosePlan={() => setActiveView('plans')}
              onOpenAdminDashboard={handleOpenAdminDashboard}
              adminUser={adminUser}
            />

            {/* Chef Kitchen & Sourcing Proof Feature */}
            <section className="py-10 border-y border-stone-200/60 dark:border-stone-800/60 bg-stone-100/50 dark:bg-stone-900/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl aspect-16/10">
                    <img
                      src={CHEF_KITCHEN_IMAGE}
                      alt="Executive chef garnishing salmon plate in commercial kitchen"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs uppercase font-semibold text-amber-700 dark:text-amber-400 tracking-wider">
                      The Culinary Philosophy
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
                      Crafted by culinary artists, verified by sports nutritionists.
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      Unlike factory meal kits that freeze bulk-produced foods in industrial warehouses, The Flavor House prepares meals in small culinary batches with Michelin-trained kitchen standards. Every macro gram is weighed on digital scales, vacuum-sealed at peak freshness, and delivered in refrigerated cold-transit.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                      <div className="glass-panel p-3 rounded-xl">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg tabular-numbers">100%</span>
                        <span className="block text-[11px] text-stone-500">Certified Organic Produce</span>
                      </div>
                      <div className="glass-panel p-3 rounded-xl">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg tabular-numbers">0g</span>
                        <span className="block text-[11px] text-stone-500">Preservatives or Additives</span>
                      </div>
                      <div className="glass-panel p-3 rounded-xl">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg tabular-numbers">35°F</span>
                        <span className="block text-[11px] text-stone-500">Guaranteed Transit Cold-Chain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <MenuSection
              meals={meals}
              onCustomizeMeal={(meal) => setCustomizingMeal(meal)}
              onQuickAdd={handleQuickAdd}
              cartCount={cartCount}
              onOpenCart={() => setIsCartOpen(true)}
            />

            <SubscriptionPlansSection
              onSelectPlan={handleSelectPlan}
            />

            {/* Testimonials Proof Section (Approved Subscriber Voices) */}
            <section className="py-10 sm:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                    Subscriber Voices
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
                    Trusted by Physicians, Athletes &amp; Busy Executives
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials
                    .filter((t) => t.status === 'approved')
                    .map((t) => (
                      <div key={t.id} className="glass-panel p-6 rounded-3xl shadow-lg flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-amber-500 mb-3">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">
                            "{t.quote}"
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-stone-200/60 dark:border-stone-800">
                          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                            {t.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400">
                            {t.role}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                            {t.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>

            {/* Blogs Section (3 Cards in One Row, Right-to-Left Scroll when > 3 Approved Blogs) */}
            <BlogsSection
              blogs={blogs}
              onAddBlog={(newBlog) => setBlogs((prev) => [...prev, newBlog])}
            />
          </>
        )}

        {/* VIEW 2: WEEKLY MENU ONLY */}
        {activeView === 'menu' && (
          <MenuSection
            meals={meals}
            onCustomizeMeal={(meal) => setCustomizingMeal(meal)}
            onQuickAdd={handleQuickAdd}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* VIEW 3: BUILD YOUR OWN */}
        {activeView === 'builder' && (
          <CustomMealBuilder
            onAddCustomMealToCart={handleAddToCart}
          />
        )}

        {/* VIEW 4: SUBSCRIPTION PLANS & RECURRING BILLING */}
        {activeView === 'plans' && (
          <SubscriptionPlansSection
            onSelectPlan={handleSelectPlan}
          />
        )}

        {/* VIEW 5: REAL-TIME DELIVERY TRACKER */}
        {activeView === 'tracker' && (
          <LiveDeliveryTracker />
        )}

        {/* VIEW 6: CUSTOMER DASHBOARD */}
        {activeView === 'dashboard' && (
          <CustomerDashboard
            subscription={subscription}
            onUpdateSubscription={setSubscription}
            onNavigateToMenu={() => setActiveView('menu')}
            onTrackOrder={() => setActiveView('tracker')}
            currentUser={currentUser}
            onOpenAuth={() => handleOpenAuth('signin')}
            onLogout={handleLogout}
          />
        )}

        {/* VIEW 7: RESTAURANT ADMIN OPERATIONS DASHBOARD */}
        {activeView === 'admin-dashboard' && adminUser && (
          <AdminDashboard
            adminUser={adminUser}
            onSwitchRole={(user) => setAdminUser(user)}
            onLogoutAdmin={handleAdminLogout}
            onBackToStorefront={() => setActiveView('home')}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            meals={meals}
            onAddMeal={(meal) => setMeals((prev) => [meal, ...prev])}
            onUpdateMeal={(updated) =>
              setMeals((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
            }
            onDeleteMeal={(mealId) =>
              setMeals((prev) => prev.filter((m) => m.id !== mealId))
            }
            orders={adminOrders}
            onCreateOrder={(order) => setAdminOrders((prev) => [order, ...prev])}
            onUpdateOrderStatus={(orderId, status: RestaurantOrderStatus) =>
              setAdminOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status } : o))
              )
            }
            tables={tables}
            reservations={reservations}
            onUpdateTableStatus={(tableId, status: TableStatus) =>
              setTables((prev) =>
                prev.map((t) => (t.id === tableId ? { ...t, status } : t))
              )
            }
            onAddReservation={(res) => setReservations((prev) => [res, ...prev])}
            onUpdateReservationStatus={(resId, status) =>
              setReservations((prev) =>
                prev.map((r) => (r.id === resId ? { ...r, status } : r))
              )
            }
            staff={staff}
            onAddStaff={(member) => setStaff((prev) => [...prev, member])}
            onUpdateStaffStatus={(staffId, status) =>
              setStaff((prev) =>
                prev.map((s) => (s.id === staffId ? { ...s, status } : s))
              )
            }
            expenses={expenses}
            onAddExpense={(exp) => setExpenses((prev) => [exp, ...prev])}
            onDeleteExpense={(expId) =>
              setExpenses((prev) => prev.filter((e) => e.id !== expId))
            }
            customers={customers}
            onAddCustomer={(cust) => setCustomers((prev) => [cust, ...prev])}
            testimonials={testimonials}
            onUpdateTestimonialStatus={(id, status) =>
              setTestimonials((prev) =>
                prev.map((t) => (t.id === id ? { ...t, status } : t))
              )
            }
            onDeleteTestimonial={(id) =>
              setTestimonials((prev) => prev.filter((t) => t.id !== id))
            }
            onAddTestimonial={(item) => setTestimonials((prev) => [item, ...prev])}
            blogs={blogs}
            onApproveBlog={(blogId) =>
              setBlogs((prev) =>
                prev.map((b) => (b.id === blogId ? { ...b, status: 'approved' } : b))
              )
            }
            onUnpublishBlog={(blogId) =>
              setBlogs((prev) =>
                prev.map((b) => (b.id === blogId ? { ...b, status: 'pending' } : b))
              )
            }
            onDeleteBlog={(blogId) =>
              setBlogs((prev) => prev.filter((b) => b.id !== blogId))
            }
            onAddBlog={(blog) => setBlogs((prev) => [blog, ...prev])}
          />
        )}

      </main>

      {/* Cart Review Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={handleOpenCheckout}
        activePlan={selectedPlanForCheckout}
        isSubscriptionMode={isSubscriptionCheckout}
        setIsSubscriptionMode={setIsSubscriptionCheckout}
      />

      {/* Meal Customizer Modal */}
      <MealCustomizerModal
        meal={customizingMeal}
        onClose={() => setCustomizingMeal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Stripe Checkout Modal */}
      <StripeCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        discount={appliedDiscount}
        shippingFee={shippingFee}
        tax={tax}
        finalTotal={grandTotal}
        promoCode={appliedPromo}
        isSubscription={isSubscriptionCheckout}
        subscriptionPlan={selectedPlanForCheckout}
        frequency={subscriptionFrequency}
        deliveryDay={subscriptionDeliveryDay}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Push Notification Manager Drawer */}
      <PushNotificationManager
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications(notifications.map((n) => ({ ...n, read: true })));
        }}
        onSelectAction={(url) => {
          if (url === '#tracker') setActiveView('tracker');
          if (url === '#menu') setActiveView('menu');
          if (url === '#plans') setActiveView('plans');
          if (url === '#dashboard') setActiveView('dashboard');
        }}
        onTriggerSimulatedNotification={handleTriggerSimulatedNotification}
      />

      {/* Authentication Modal (Sign In, Email Verification Code Sign Up, Password Setup) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authInitialMode}
      />

      {/* Admin Dashboard Role Login Modal (Owner / Manager / Cashier) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Clean Editorial Footer (Storefront views only) */}
      {activeView !== 'admin-dashboard' && <Footer onNavigate={setActiveView} />}

    </div>
  );
}
