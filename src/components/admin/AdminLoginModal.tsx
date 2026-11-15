import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, X, ArrowRight, AlertCircle, UserCheck } from 'lucide-react';
import { AdminUser, AdminRole } from '../../types/admin';
import { ADMIN_CREDENTIALS } from '../../data/mockAdmin';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('owner@theflavorhouse.com');
  const [password, setPassword] = useState('Owner2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickFillRole = (role: AdminRole) => {
    const entry = ADMIN_CREDENTIALS.find((c) => c.user.role === role);
    if (entry) {
      setEmail(entry.user.email);
      setPassword(entry.password);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const matched = ADMIN_CREDENTIALS.find(
      (c) =>
        c.user.email.toLowerCase() === email.trim().toLowerCase() &&
        c.password === password.trim()
    );

    if (!matched) {
      setError('Invalid admin email or password. Select a role preset below or verify credentials.');
      return;
    }

    onLoginSuccess(matched.user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-amber-600 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
                Restaurant Operations Login
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Role-based staff access for The Flavor House
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            aria-label="Close admin login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Preset Selector */}
        <div className="px-6 pt-5 pb-2">
          <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 mb-2">
            Select Staff Role Access:
          </p>
          <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            {(['owner', 'manager', 'cashier'] as AdminRole[]).map((roleKey) => {
              const isSelected = email.toLowerCase().startsWith(roleKey);
              return (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => handleQuickFillRole(roleKey)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {roleKey}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
            {email.startsWith('owner')
              ? 'Owner: Full access to Finance, Expenses, Staff Payroll, Menu, Orders, Blogs & Subscriber Voices.'
              : email.startsWith('manager')
              ? 'Manager: Full Menu, Orders, Tables, Staff Shifts, Customer Directory & Content Moderation.'
              : 'Cashier: POS Order intake, Order status tracking, Tables & Daily Receipts.'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Access Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
