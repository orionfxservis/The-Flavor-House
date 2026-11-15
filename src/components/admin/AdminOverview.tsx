import React from 'react';
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Armchair,
  ArrowRight,
  UtensilsCrossed
} from 'lucide-react';
import { MealItem } from '../../types/meal';
import { RestaurantOrder, RestaurantTable } from '../../types/admin';
import { TODAY_ISO } from '../../data/mockAdmin';

interface AdminOverviewProps {
  orders: RestaurantOrder[];
  meals: MealItem[];
  tables: RestaurantTable[];
  pendingVoicesCount: number;
  pendingBlogsCount: number;
  onNavigateSection: (section: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  orders,
  meals,
  tables,
  pendingVoicesCount,
  pendingBlogsCount,
  onNavigateSection
}) => {
  const todaysOrders = orders.filter((o) => o.dateISO === TODAY_ISO);
  const todaysRevenue = todaysOrders.reduce((sum, o) => sum + o.total, 0);
  const avgTicket = todaysOrders.length > 0 ? todaysRevenue / todaysOrders.length : 0;
  const activeTablesCount = tables.filter((t) => t.status === 'occupied' || t.status === 'reserved').length;

  // Compute Top-Selling Dishes from all recorded orders
  const dishSalesMap = new Map<string, { name: string; units: number; revenue: number }>();
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const existing = dishSalesMap.get(item.name);
      if (existing) {
        existing.units += item.quantity;
        existing.revenue += item.quantity * item.unitPrice;
      } else {
        dishSalesMap.set(item.name, {
          name: item.name,
          units: item.quantity,
          revenue: item.quantity * item.unitPrice
        });
      }
    });
  });

  const topSellingDishes = Array.from(dishSalesMap.values())
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);
  const maxUnits = topSellingDishes.length > 0 ? topSellingDishes[0].units : 1;

  const recentOrders = orders.slice(0, 8);

  return (
    <div className="sm:h-full sm:min-h-0 flex flex-col gap-5">
      {/* Fixed Top Section: Title + 4 Primary KPI Cards */}
      <div className="shrink-0 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
              Today’s Operations Overview
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Live snapshot of today’s orders, restaurant revenue, floor occupancy, and top-selling dishes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateSection('orders')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            + Take New Order
          </button>
        </div>

        {/* 4 Primary KPI Cards (Fixed above scroll zone — compact height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between text-[11px] leading-tight font-medium text-stone-500 dark:text-stone-400">
            <span>Today’s Orders</span>
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          </div>
          <p className="mt-1 font-serif text-2xl leading-tight font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            {todaysOrders.length}
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-stone-500 dark:text-stone-400 tabular-nums">
            {todaysOrders.filter((o) => o.status !== 'delivered').length} active in kitchen queue
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between text-[11px] leading-tight font-medium text-stone-500 dark:text-stone-400">
            <span>Today’s Revenue</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          </div>
          <p className="mt-1 font-serif text-2xl leading-tight font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            ${todaysRevenue.toFixed(2)}
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-emerald-700 dark:text-emerald-400 tabular-nums">
            Avg ticket ${avgTicket.toFixed(2)} per order
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between text-[11px] leading-tight font-medium text-stone-500 dark:text-stone-400">
            <span>Active &amp; Reserved Tables</span>
            <Armchair className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          </div>
          <p className="mt-1 font-serif text-2xl leading-tight font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            {activeTablesCount} / {tables.length}
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-stone-500 dark:text-stone-400">
            {tables.filter((t) => t.status === 'available').length} open for walk-ins
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between text-[11px] leading-tight font-medium text-stone-500 dark:text-stone-400">
            <span>Active Menu &amp; Approvals</span>
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          </div>
          <p className="mt-1 font-serif text-2xl leading-tight font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            {meals.filter((m) => m.available !== false).length} Dishes
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-amber-700 dark:text-amber-400 tabular-nums">
            {pendingVoicesCount} reviews · {pendingBlogsCount} blog pending
          </p>
        </div>
      </div>
      </div>

      {/* Scrollable Lower Region Under the Four Cards */}
      <div className="flex-1 min-h-0 sm:overflow-y-auto sm:pr-1 space-y-6 pb-4">
        {/* Main Split: Top-Selling Dishes + Live Order Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top-Selling Dishes */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
                Top-Selling Dishes
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateSection('menu')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
            >
              Manage Menu →
            </button>
          </div>

          <div className="space-y-4">
            {topSellingDishes.map((dish, idx) => {
              const pct = Math.round((dish.units / maxUnits) * 100);
              return (
                <div key={dish.name} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="font-medium text-stone-900 dark:text-stone-100 truncate">
                      {idx + 1}. {dish.name}
                    </span>
                    <span className="font-mono text-xs text-stone-600 dark:text-stone-300 tabular-nums shrink-0">
                      {dish.units} sold · ${dish.revenue.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Orders Snapshot */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
              Recent &amp; Active Orders
            </h2>
            <button
              type="button"
              onClick={() => onNavigateSection('orders')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Open Kitchen Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs">
                  <th className="py-2.5 pr-3 font-medium">Order</th>
                  <th className="py-2.5 px-3 font-medium">Customer</th>
                  <th className="py-2.5 px-3 font-medium">Service</th>
                  <th className="py-2.5 px-3 font-medium">Status</th>
                  <th className="py-2.5 pl-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/70">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-2.5 pr-3 font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                      {order.orderNumber}
                    </td>
                    <td className="py-2.5 px-3 text-stone-800 dark:text-stone-200">
                      {order.customerName}
                    </td>
                    <td className="py-2.5 px-3 capitalize text-stone-600 dark:text-stone-400">
                      {order.serviceType}{order.tableNumber ? ` · ${order.tableNumber}` : ''}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-xs font-semibold capitalize ${
                          order.status === 'delivered'
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : order.status === 'ready'
                            ? 'text-amber-700 dark:text-amber-400'
                            : order.status === 'preparing'
                            ? 'text-blue-700 dark:text-blue-400'
                            : 'text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2.5 pl-3 text-right font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dining Floor & Moderation Quick Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
              Dining Floor Status
            </h2>
            <button
              type="button"
              onClick={() => onNavigateSection('tables')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
            >
              Manage Tables →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tables.map((table) => (
              <div
                key={table.id}
                className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="font-mono text-stone-900 dark:text-stone-100">{table.tableNumber}</span>
                  <span
                    className={`capitalize text-[11px] ${
                      table.status === 'available'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : table.status === 'occupied'
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {table.status}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 truncate">
                  {table.zone} · {table.seats} seats
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50 mb-1">
              Content Moderation Queue
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Review pending customer testimonials and blog posts before publishing to the main website.
            </p>
          </div>
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => onNavigateSection('voices')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors cursor-pointer text-left"
            >
              <div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Subscriber Voices</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">Customer reviews awaiting approval</p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                {pendingVoicesCount} pending →
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('blogs')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors cursor-pointer text-left"
            >
              <div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Healthy Recipes &amp; Blogs</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">Articles queued for main page carousel</p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                {pendingBlogsCount} pending →
              </span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
