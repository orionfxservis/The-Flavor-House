import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Truck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="glass-panel border-t border-stone-200/80 dark:border-stone-800 pt-12 pb-10 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200/60 dark:border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-50 block">
              THE FLAVOR HOUSE
            </span>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Nationwide chef-prepared healthy meal delivery service. 100% organic produce, wild-caught seafood, and grass-fed meats portioned by culinary artisans and delivered fresh in insulated thermal boxes across the United States.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Stripe PCI-DSS Verified Recurring Billing</span>
            </div>
          </div>

          {/* Quick Menus */}
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
              Culinary Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Morning Breakfast (7am – 11:30am)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Lunch Service (11:30am – 4:30pm)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Dinner Dining (4:30pm – 10:30pm)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('builder')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Build-Your-Own Macro Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Recurring Dining Subscriptions
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Subscription Help */}
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
              Subscription Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Skip Delivery or Pause Subscription
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Track Refrigerated Van Live
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer">
                  Stripe Payment & Invoices
                </button>
              </li>
              <li>
                <a href="tel:18005552532" className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>1-800-555-CLEAN (Mon–Fri 8am–7pm)</span>
                </a>
              </li>
              <li>
                <a href="mailto:concierge@theflavorhouse.com" className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>concierge@theflavorhouse.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* USA Sourcing & Eco-Packaging */}
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4">
              Cold-Chain Promise
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
              Every delivery is transported under strict 35°F–38°F temperature monitoring in 100% curbside recyclable insulated cotton cooler liners and non-toxic ice packs.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Delivering to 48 US Contiguous States</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div>
            © {new Date().getFullYear()} The Flavor House LLC. All rights reserved. Gourmet meal delivery across the USA.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Subscription</span>
            <span>Food Safety Audits</span>
            <span>Stripe Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
