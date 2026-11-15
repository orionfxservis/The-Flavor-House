import React, { useState } from 'react';
import { Plus, Utensils, ShoppingBag, Truck, X, ArrowRight } from 'lucide-react';
import { MealItem } from '../../types/meal';
import {
  RestaurantOrder,
  OrderServiceType,
  RestaurantOrderStatus,
  RestaurantTable
} from '../../types/admin';
import { TODAY_ISO } from '../../data/mockAdmin';

interface AdminOrdersSectionProps {
  orders: RestaurantOrder[];
  meals: MealItem[];
  tables: RestaurantTable[];
  onCreateOrder: (order: RestaurantOrder) => void;
  onUpdateStatus: (orderId: string, status: RestaurantOrderStatus) => void;
}

const STATUS_SEQUENCE: RestaurantOrderStatus[] = ['new', 'preparing', 'ready', 'delivered'];

export const AdminOrdersSection: React.FC<AdminOrdersSectionProps> = ({
  orders,
  meals,
  tables,
  onCreateOrder,
  onUpdateStatus
}) => {
  const [serviceFilter, setServiceFilter] = useState<'all' | OrderServiceType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RestaurantOrderStatus>('all');
  const [isPosOpen, setIsPosOpen] = useState(false);

  // POS New Order State
  const [serviceType, setServiceType] = useState<OrderServiceType>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNumber, setTableNumber] = useState(tables[0]?.tableNumber || 'T1');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card (Stripe)' | 'Cash' | 'Apple Pay'>('Card (Stripe)');
  const [selectedDishCounts, setSelectedDishCounts] = useState<Record<string, number>>({});

  const filteredOrders = orders.filter((o) => {
    if (serviceFilter !== 'all' && o.serviceType !== serviceFilter) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  const handleQtyChange = (mealId: string, delta: number) => {
    setSelectedDishCounts((prev) => {
      const nextQty = Math.max(0, (prev[mealId] || 0) + delta);
      const updated = { ...prev };
      if (nextQty === 0) {
        delete updated[mealId];
      } else {
        updated[mealId] = nextQty;
      }
      return updated;
    });
  };

  const posItems = Object.entries(selectedDishCounts)
    .map(([mealId, qty]) => {
      const meal = meals.find((m) => m.id === mealId);
      if (!meal) return null;
      return {
        mealId: meal.id,
        name: meal.name,
        quantity: qty,
        unitPrice: meal.price
      };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  const posSubtotal = posItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const posTax = posSubtotal * 0.0825;
  const posTotal = posSubtotal + posTax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (posItems.length === 0 || !customerName.trim()) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder: RestaurantOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `FH-${Math.floor(4200 + Math.random() * 700)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || '+1 (504) 555-0100',
      serviceType,
      tableNumber: serviceType === 'dine-in' ? tableNumber : undefined,
      deliveryAddress: serviceType === 'delivery' ? deliveryAddress.trim() || 'Local Express Courier' : undefined,
      items: posItems,
      subtotal: posSubtotal,
      tax: posTax,
      total: posTotal,
      status: 'new',
      paymentMethod,
      createdAt: formattedTime,
      dateISO: TODAY_ISO
    };

    onCreateOrder(newOrder);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setSelectedDishCounts({});
    setIsPosOpen(false);
  };

  const getNextStatus = (current: RestaurantOrderStatus): RestaurantOrderStatus | null => {
    const idx = STATUS_SEQUENCE.indexOf(current);
    if (idx >= 0 && idx < STATUS_SEQUENCE.length - 1) {
      return STATUS_SEQUENCE[idx + 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Orders &amp; Kitchen Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Take dine-in, takeaway, and delivery orders and advance status from New → Preparing → Ready → Delivered.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsPosOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New POS Order</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl">
          {(['all', 'dine-in', 'takeaway', 'delivery'] as const).map((svc) => (
            <button
              key={svc}
              type="button"
              onClick={() => setServiceFilter(svc)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer whitespace-nowrap ${
                serviceFilter === svc
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {svc === 'all' ? 'All Service Types' : svc}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl">
          {(['all', 'new', 'preparing', 'ready', 'delivered'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {st === 'all' ? 'All Statuses' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOrders.map((order) => {
          const nextStatus = getNextStatus(order.status);
          return (
            <div
              key={order.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 tabular-nums">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        · {order.createdAt}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-1">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 capitalize flex items-center gap-1.5 mt-0.5">
                      {order.serviceType === 'dine-in' && <Utensils className="w-3.5 h-3.5 text-amber-600" />}
                      {order.serviceType === 'takeaway' && <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />}
                      {order.serviceType === 'delivery' && <Truck className="w-3.5 h-3.5 text-amber-600" />}
                      <span>
                        {order.serviceType}
                        {order.tableNumber ? ` (${order.tableNumber})` : ''}
                      </span>
                    </p>
                    {order.deliveryAddress && (
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                        {order.deliveryAddress}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${
                      order.status === 'delivered'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                        : order.status === 'ready'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                        : order.status === 'preparing'
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <ul className="py-3 space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between gap-2">
                      <span>
                        <strong className="font-mono">{item.quantity}×</strong> {item.name}
                      </span>
                      <span className="font-mono tabular-nums shrink-0">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Status Controls */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400">{order.paymentMethod}</span>
                  <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 tabular-nums">
                    Total: ${order.total.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value as RestaurantOrderStatus)}
                    className="px-2.5 py-1.5 text-xs font-medium bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200"
                  >
                    <option value="new">New</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  {nextStatus && (
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(order.id, nextStatus)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors capitalize cursor-pointer whitespace-nowrap"
                    >
                      <span>Mark {nextStatus}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Take New POS Order Modal */}
      {isPosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                Take New Order (Dine-In / Takeaway / Delivery)
              </h3>
              <button
                type="button"
                onClick={() => setIsPosOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Service Type Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
                {(['dine-in', 'takeaway', 'delivery'] as OrderServiceType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setServiceType(type)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                      serviceType === type
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Guest full name"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (504) 555-0190"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              {serviceType === 'dine-in' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Assign Table
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.tableNumber}>
                        {t.tableNumber} — {t.zone} ({t.seats} seats · {t.status})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {serviceType === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street address, suite, city & ZIP"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              )}

              {/* Dish Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Select Dishes ({posItems.reduce((s, i) => s + i.quantity, 0)} selected)
                </label>
                <div className="max-h-52 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl">
                  {meals
                    .filter((m) => m.available !== false)
                    .map((meal) => {
                      const qty = selectedDishCounts[meal.id] || 0;
                      return (
                        <div key={meal.id} className="flex items-center justify-between px-3.5 py-2 text-xs">
                          <div className="min-w-0 pr-2">
                            <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                              {meal.name}
                            </p>
                            <p className="text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                              ${meal.price.toFixed(2)} · {meal.category}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(meal.id, -1)}
                              className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center font-mono font-semibold tabular-nums">{qty}</span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(meal.id, 1)}
                              className="w-6 h-6 rounded-md bg-amber-600 text-white font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                <div className="text-xs space-y-0.5 font-mono tabular-nums">
                  <p className="text-stone-500 dark:text-stone-400">
                    Subtotal: ${posSubtotal.toFixed(2)} · Tax: ${posTax.toFixed(2)}
                  </p>
                  <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                    Total: ${posTotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as 'Card (Stripe)' | 'Cash' | 'Apple Pay')}
                    className="px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="Card (Stripe)">Card (Stripe)</option>
                    <option value="Apple Pay">Apple Pay</option>
                    <option value="Cash">Cash</option>
                  </select>
                  <button
                    type="submit"
                    disabled={posItems.length === 0 || !customerName.trim()}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
