import React, { useState } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CalendarDays,
  Users,
  DollarSign,
  Contact,
  MessageSquareQuote,
  BookOpen,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';
import { MealItem, BlogPost } from '../../types/meal';
import {
  AdminUser,
  AdminRole,
  RestaurantOrder,
  RestaurantOrderStatus,
  RestaurantTable,
  TableStatus,
  TableReservation,
  StaffMember,
  ExpenseEntry,
  CustomerRecord,
  TestimonialItem
} from '../../types/admin';
import { ADMIN_CREDENTIALS } from '../../data/mockAdmin';
import { AdminOverview } from './AdminOverview';
import { AdminMenuSection } from './AdminMenuSection';
import { AdminOrdersSection } from './AdminOrdersSection';
import { AdminTablesSection, AdminStaffSection } from './AdminTablesStaff';
import { AdminSalesSection, AdminCustomersSection } from './AdminFinanceCustomers';
import { AdminVoicesSection, AdminBlogsSection } from './AdminModerationSection';

export type AdminSectionId =
  | 'overview'
  | 'menu'
  | 'orders'
  | 'tables'
  | 'staff'
  | 'sales'
  | 'customers'
  | 'voices'
  | 'blogs';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onSwitchRole: (user: AdminUser) => void;
  onLogoutAdmin: () => void;
  onBackToStorefront: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;

  // Live synced state from App.tsx
  meals: MealItem[];
  onAddMeal: (meal: MealItem) => void;
  onUpdateMeal: (meal: MealItem) => void;
  onDeleteMeal: (mealId: string) => void;

  orders: RestaurantOrder[];
  onCreateOrder: (order: RestaurantOrder) => void;
  onUpdateOrderStatus: (orderId: string, status: RestaurantOrderStatus) => void;

  tables: RestaurantTable[];
  reservations: TableReservation[];
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
  onAddReservation: (res: TableReservation) => void;
  onUpdateReservationStatus: (resId: string, status: TableReservation['status']) => void;

  staff: StaffMember[];
  onAddStaff: (member: StaffMember) => void;
  onUpdateStaffStatus: (staffId: string, status: StaffMember['status']) => void;

  expenses: ExpenseEntry[];
  onAddExpense: (expense: ExpenseEntry) => void;
  onDeleteExpense: (expenseId: string) => void;

  customers: CustomerRecord[];
  onAddCustomer: (customer: CustomerRecord) => void;

  testimonials: TestimonialItem[];
  onUpdateTestimonialStatus: (id: string, status: TestimonialItem['status']) => void;
  onDeleteTestimonial: (id: string) => void;
  onAddTestimonial: (item: TestimonialItem) => void;

  blogs: BlogPost[];
  onApproveBlog: (blogId: string) => void;
  onUnpublishBlog: (blogId: string) => void;
  onDeleteBlog: (blogId: string) => void;
  onAddBlog: (blog: BlogPost) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeSection, setActiveSection] = useState<AdminSectionId>('overview');

  const pendingVoicesCount = props.testimonials.filter((t) => t.status === 'pending').length;
  const pendingBlogsCount = props.blogs.filter((b) => (b.status || 'approved') === 'pending').length;

  const navItems: { id: AdminSectionId; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'menu', label: '1. Menu Management', icon: UtensilsCrossed },
    { id: 'orders', label: '2. Orders & Dispatch', icon: ShoppingBag },
    { id: 'tables', label: '3. Tables & Bookings', icon: CalendarDays },
    { id: 'staff', label: '4. Staff & Shifts', icon: Users },
    { id: 'sales', label: '5. Sales & Payments', icon: DollarSign },
    { id: 'customers', label: '6. Customers', icon: Contact },
    { id: 'voices', label: '7. Subscriber Voices', icon: MessageSquareQuote, badge: pendingVoicesCount },
    { id: 'blogs', label: '8. Blogs Approval', icon: BookOpen, badge: pendingBlogsCount }
  ];

  const handleRoleQuickSwitch = (role: AdminRole) => {
    const match = ADMIN_CREDENTIALS.find((c) => c.user.role === role);
    if (match) props.onSwitchRole(match.user);
  };

  return (
    <div className="min-h-screen sm:h-screen sm:overflow-hidden bg-stone-50 dark:bg-stone-950 flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 sm:pb-6 flex-1 min-h-0 flex flex-col">
        {/* Top Admin Breadcrumb & Role Access Bar (Fixed Top Menu) */}
        <div className="shrink-0 mb-5">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={props.onBackToStorefront}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Main Site</span>
            </button>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-serif font-bold text-stone-900 dark:text-stone-50">
                The Flavor House Console
              </span>
              <span className="text-stone-400">/</span>
              <span className="font-medium text-amber-700 dark:text-amber-400">
                {navItems.find((n) => n.id === activeSection)?.label}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Role Access Switcher (Owner / Manager / Cashier) */}
            <div className="flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-stone-500 dark:text-stone-400 hidden sm:inline">Role:</span>
              <div className="flex items-center p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
                {(['owner', 'manager', 'cashier'] as AdminRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleQuickSwitch(role)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors cursor-pointer ${
                      props.adminUser.role === role
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                  {props.adminUser.name}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 capitalize">
                  {props.adminUser.role} Access
                </p>
              </div>
              {props.onToggleTheme && (
                <button
                  type="button"
                  onClick={props.onToggleTheme}
                  className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  aria-label="Toggle Dark/Light Theme"
                  title="Toggle Dark/Light Theme"
                >
                  {props.isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={props.onLogoutAdmin}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg cursor-pointer"
                title="Sign out of Admin Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Workspace Canvas: Left Scrollable Detail Section (Col 1) + Right Fixed Side Menu (Col 2) */}
        <div className="flex-1 min-h-0 flex flex-col-reverse sm:grid sm:grid-cols-[minmax(0,1fr)_192px] gap-5 lg:gap-6 items-start sm:items-stretch">
          {/* Left Side (Column 1): Active Section Content */}
          <div
            className={`min-w-0 w-full sm:col-start-1 sm:row-start-1 ${
              activeSection === 'overview'
                ? 'sm:h-full sm:min-h-0 flex flex-col sm:overflow-hidden'
                : 'sm:h-full sm:overflow-y-auto sm:pr-2 pb-6'
            }`}
          >
            {activeSection === 'overview' && (
              <AdminOverview
                orders={props.orders}
                meals={props.meals}
                tables={props.tables}
                pendingVoicesCount={pendingVoicesCount}
                pendingBlogsCount={pendingBlogsCount}
                onNavigateSection={(sec) => setActiveSection(sec as AdminSectionId)}
              />
            )}

            {activeSection === 'menu' && (
              <AdminMenuSection
                meals={props.meals}
                onAddMeal={props.onAddMeal}
                onUpdateMeal={props.onUpdateMeal}
                onDeleteMeal={props.onDeleteMeal}
                userRole={props.adminUser.role}
              />
            )}

            {activeSection === 'orders' && (
              <AdminOrdersSection
                orders={props.orders}
                meals={props.meals}
                tables={props.tables}
                onCreateOrder={props.onCreateOrder}
                onUpdateStatus={props.onUpdateOrderStatus}
              />
            )}

            {activeSection === 'tables' && (
              <AdminTablesSection
                tables={props.tables}
                reservations={props.reservations}
                onUpdateTableStatus={props.onUpdateTableStatus}
                onAddReservation={props.onAddReservation}
                onUpdateReservationStatus={props.onUpdateReservationStatus}
              />
            )}

            {activeSection === 'staff' && (
              <AdminStaffSection
                staff={props.staff}
                userRole={props.adminUser.role}
                onAddStaff={props.onAddStaff}
                onUpdateStaffStatus={props.onUpdateStaffStatus}
              />
            )}

            {activeSection === 'sales' && (
              <AdminSalesSection
                orders={props.orders}
                expenses={props.expenses}
                userRole={props.adminUser.role}
                onAddExpense={props.onAddExpense}
                onDeleteExpense={props.onDeleteExpense}
              />
            )}

            {activeSection === 'customers' && (
              <AdminCustomersSection
                customers={props.customers}
                onAddCustomer={props.onAddCustomer}
              />
            )}

            {activeSection === 'voices' && (
              <AdminVoicesSection
                testimonials={props.testimonials}
                userRole={props.adminUser.role}
                onUpdateStatus={props.onUpdateTestimonialStatus}
                onDeleteTestimonial={props.onDeleteTestimonial}
                onAddTestimonial={props.onAddTestimonial}
              />
            )}

            {activeSection === 'blogs' && (
              <AdminBlogsSection
                blogs={props.blogs}
                userRole={props.adminUser.role}
                onApproveBlog={props.onApproveBlog}
                onUnpublishBlog={props.onUnpublishBlog}
                onDeleteBlog={props.onDeleteBlog}
                onAddBlog={props.onAddBlog}
              />
            )}
          </div>

          {/* Right Side Navigation Menu (Column 2 — Fixed, 192px wide) */}
          <aside className="w-full sm:col-start-2 sm:row-start-1 sm:w-[192px] sm:self-start sm:max-h-full sm:overflow-y-auto">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-2">
              <nav className="grid grid-cols-2 sm:grid-cols-1 gap-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </span>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold tabular-nums shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
