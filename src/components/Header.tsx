import React, { useState } from 'react';
import { ShoppingBag, Bell, Moon, Sun, Menu, X, UserCheck, MapPin, User, LogOut, KeyRound } from 'lucide-react';
import { UserProfile } from '../types/meal';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDashboard: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  cartCount,
  onOpenCart,
  unreadNotifications,
  onOpenNotifications,
  isDarkMode,
  onToggleTheme,
  onOpenDashboard,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'menu', label: 'Dining Menu' },
    { id: 'builder', label: 'Build Your Own' },
    { id: 'plans', label: 'Dining Plans' },
    { id: 'tracker', label: 'Track Delivery' },
    { id: 'dashboard', label: 'My Subscription' }
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-stone-200/60 dark:border-stone-800/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 xl:gap-6">
        {/* Zone 1: Brand Wordmark (Single text element in editorial display serif face) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left text-base sm:text-xl xl:text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
        >
          THE FLAVOR HOUSE
        </button>

        {/* Zone 2: 5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 text-[13px] xl:text-sm font-medium text-stone-600 dark:text-stone-300">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-amber-800 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                    : 'hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive controls & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Push Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-full hover:bg-stone-100/70 dark:hover:bg-stone-800/70 transition-colors cursor-pointer"
            title="Notifications & Delivery Updates"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-600 px-1 text-[10px] font-semibold text-white tabular-nums">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-full hover:bg-stone-100/70 dark:hover:bg-stone-800/70 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
          </button>

          {/* Customer Account / Sign In State */}
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-1.5 bg-stone-100/90 dark:bg-stone-800/90 p-1 pl-2.5 rounded-xl border border-stone-200/60 dark:border-stone-700/60 shrink-0">
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
                title="View Account Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={onLogout}
                className="p-1 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-700/60 transition-colors cursor-pointer"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100/80 dark:bg-stone-800/80 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Shopping Bag & Checkout Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order</span>
            <span className="bg-amber-600 dark:bg-amber-500 text-white dark:text-stone-950 text-xs rounded-full px-1.5 py-0.2 tabular-numbers font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-700 dark:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-stone-200/60 dark:border-stone-800/60 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === link.id
                  ? 'bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100/80 dark:hover:bg-stone-800/80'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200/50 dark:border-stone-800/50 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-2 bg-stone-100/70 dark:bg-stone-800/70 rounded-lg text-xs">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Signed in as: {currentUser.name}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold bg-amber-600 text-white"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenDashboard();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Customer Account & Billing</span>
            </button>
            <div className="flex items-center justify-between px-3 py-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Delivering Fresh Across All 48 US States
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
