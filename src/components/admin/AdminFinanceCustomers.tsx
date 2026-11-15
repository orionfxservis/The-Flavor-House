import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Receipt,
  Plus,
  Trash2,
  X,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { RestaurantOrder, ExpenseEntry, CustomerRecord, AdminRole } from '../../types/admin';
import { TODAY_ISO } from '../../data/mockAdmin';

interface AdminSalesSectionProps {
  orders: RestaurantOrder[];
  expenses: ExpenseEntry[];
  userRole: AdminRole;
  onAddExpense: (expense: ExpenseEntry) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export const AdminSalesSection: React.FC<AdminSalesSectionProps> = ({
  orders,
  expenses,
  userRole,
  onAddExpense,
  onDeleteExpense
}) => {
  const [period, setPeriod] = useState<'daily' | 'monthly'>('daily');
  const [selectedReceipt, setSelectedReceipt] = useState<RestaurantOrder | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<ExpenseEntry['category']>('Produce & Organics');
  const [expAmount, setExpAmount] = useState('');
  const [expVendor, setExpVendor] = useState('');

  const canManageExpenses = userRole === 'owner' || userRole === 'manager';

  const relevantOrders = period === 'daily' ? orders.filter((o) => o.dateISO === TODAY_ISO) : orders;
  const relevantExpenses = period === 'daily' ? expenses.filter((e) => e.dateISO === TODAY_ISO) : expenses;

  // Include baseline monthly subscription volume for monthly reporting alongside POS orders
  const subscriptionBaseline = period === 'monthly' ? 14280.0 : 0;
  const grossSales = relevantOrders.reduce((s, o) => s + o.total, 0) + subscriptionBaseline;
  const totalExpenses = relevantExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = grossSales - totalExpenses;

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expAmount);
    if (!expTitle.trim() || isNaN(amt) || amt <= 0) return;

    onAddExpense({
      id: `exp-${Date.now()}`,
      title: expTitle.trim(),
      category: expCategory,
      amount: amt,
      dateISO: TODAY_ISO,
      vendor: expVendor.trim() || 'Direct Supplier'
    });

    setExpTitle('');
    setExpAmount('');
    setExpVendor('');
    setIsAddExpenseOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Sales, Expenses &amp; Payment Receipts
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Track daily and monthly revenue, operating expenses, profit margins, and itemized customer receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => setPeriod('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                period === 'daily'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Daily Summary
            </button>
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                period === 'monthly'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Monthly Summary
            </button>
          </div>

          {canManageExpenses && (
            <button
              type="button"
              onClick={() => setIsAddExpenseOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Expense</span>
            </button>
          )}
        </div>
      </div>

      {/* Profit Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>{period === 'daily' ? 'Today’s Gross Sales' : 'Monthly Gross Sales'}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            ${grossSales.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 tabular-nums">
            {relevantOrders.length} POS orders{period === 'monthly' ? ' + recurring subscriptions' : ''}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>{period === 'daily' ? 'Today’s Expenses' : 'Monthly Operating Expenses'}</span>
            <TrendingDown className="w-4 h-4 text-amber-600" />
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            ${totalExpenses.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 tabular-nums">
            {relevantExpenses.length} expense entries recorded
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>Net Profit Summary</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p
            className={`mt-2 font-serif text-3xl font-bold tabular-nums ${
              netProfit >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {netProfit >= 0 ? `$${netProfit.toFixed(2)}` : `-$${Math.abs(netProfit).toFixed(2)}`}
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Margin after food &amp; operating expenses
          </p>
        </div>
      </div>

      {/* Receipts & Expenses Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Receipts List */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-600" />
              <span>Payment Receipts</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <th className="py-2.5 pr-3 font-medium">Receipt #</th>
                  <th className="py-2.5 px-3 font-medium">Customer</th>
                  <th className="py-2.5 px-3 font-medium">Method</th>
                  <th className="py-2.5 px-3 font-medium text-right">Amount</th>
                  <th className="py-2.5 pl-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {relevantOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40">
                    <td className="py-2.5 pr-3 font-mono font-semibold text-stone-900 dark:text-stone-100">
                      {order.orderNumber}
                    </td>
                    <td className="py-2.5 px-3 text-stone-700 dark:text-stone-300">
                      {order.customerName}
                    </td>
                    <td className="py-2.5 px-3 text-stone-500 dark:text-stone-400">
                      {order.paymentMethod}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-2.5 pl-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(order)}
                        className="text-amber-700 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses Ledger */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50 mb-4">
            Operating Expenses Ledger
          </h2>
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {relevantExpenses.map((exp) => (
              <div key={exp.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {exp.title}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {exp.category} · {exp.vendor} · {exp.dateISO}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                    ${exp.amount.toFixed(2)}
                  </span>
                  {canManageExpenses && (
                    <button
                      type="button"
                      onClick={() => onDeleteExpense(exp.id)}
                      className="p-1 text-stone-400 hover:text-red-500 cursor-pointer"
                      title="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Receipt Viewer Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-start justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  The Flavor House · POS Receipt
                </p>
                <h3 className="font-mono font-bold text-xl text-stone-900 dark:text-stone-50 mt-0.5">
                  {selectedReceipt.orderNumber}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {selectedReceipt.dateISO} at {selectedReceipt.createdAt}
                </p>
              </div>
              <button type="button" onClick={() => setSelectedReceipt(null)} className="text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2 text-xs border-b border-stone-200 dark:border-stone-800">
              <p className="text-stone-600 dark:text-stone-300">
                Customer: <strong className="text-stone-900 dark:text-stone-100">{selectedReceipt.customerName}</strong>
              </p>
              <p className="text-stone-600 dark:text-stone-300 capitalize">
                Service: {selectedReceipt.serviceType}{selectedReceipt.tableNumber ? ` · ${selectedReceipt.tableNumber}` : ''}
              </p>
              <p className="text-stone-600 dark:text-stone-300">
                Payment: {selectedReceipt.paymentMethod}
              </p>
            </div>

            <div className="py-4 space-y-2 text-xs">
              {selectedReceipt.items.map((it, i) => (
                <div key={i} className="flex justify-between gap-2 text-stone-700 dark:text-stone-300">
                  <span>{it.quantity}× {it.name}</span>
                  <span className="font-mono tabular-nums">${(it.quantity * it.unitPrice).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-1 font-mono tabular-nums">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>${selectedReceipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Tax (8.25%)</span>
                  <span>${selectedReceipt.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-stone-50 pt-1">
                  <span>Total Paid</span>
                  <span>${selectedReceipt.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl cursor-pointer"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                Log Operating Expense
              </h3>
              <button type="button" onClick={() => setIsAddExpenseOpen(false)} className="text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Expense Description
                </label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. Organic Herbs & Citrus Shipment"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as ExpenseEntry['category'])}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="Produce & Organics">Produce &amp; Organics</option>
                    <option value="Proteins & Seafood">Proteins &amp; Seafood</option>
                    <option value="Packaging & Cold-Chain">Packaging &amp; Cold-Chain</option>
                    <option value="Staff Payroll">Staff Payroll</option>
                    <option value="Utilities & Rent">Utilities &amp; Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    placeholder="250.00"
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Supplier / Vendor
                </label>
                <input
                  type="text"
                  value={expVendor}
                  onChange={(e) => setExpVendor(e.target.value)}
                  placeholder="Supplier company name"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddExpenseOpen(false)} className="px-4 py-2 text-xs font-semibold text-stone-600 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer">
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface AdminCustomersSectionProps {
  customers: CustomerRecord[];
  onAddCustomer: (customer: CustomerRecord) => void;
}

export const AdminCustomersSection: React.FC<AdminCustomersSectionProps> = ({
  customers,
  onAddCustomer
}) => {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(customers[0] || null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const created: CustomerRecord = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+1 (504) 555-0190',
      city: city.trim() || 'New Orleans, LA',
      loyaltyTier: 'Regular',
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: 'New Contact',
      favoriteDish: 'None yet',
      orderHistory: []
    };
    onAddCustomer(created);
    setSelectedCustomer(created);
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Customers &amp; Order History
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Search verified diner contacts, loyalty status, and complete order history.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer name, email, phone, or city..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {filtered.map((cust) => {
              const isSelected = selectedCustomer?.id === cust.id;
              return (
                <button
                  key={cust.id}
                  type="button"
                  onClick={() => setSelectedCustomer(cust)}
                  className={`w-full text-left p-4 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 dark:bg-amber-950/25'
                      : 'hover:bg-stone-50/70 dark:hover:bg-stone-800/30'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">
                        {cust.name}
                      </p>
                      <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                        · {cust.loyaltyTier}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {cust.email} · {cust.phone}
                    </p>
                  </div>
                  <div className="text-right font-mono tabular-nums shrink-0">
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      ${cust.totalSpent.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {cust.totalOrders} orders
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Customer Order History Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6">
          {selectedCustomer ? (
            <div className="space-y-4">
              <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  {selectedCustomer.loyaltyTier}
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50 mt-0.5">
                  {selectedCustomer.name}
                </h3>
                <div className="mt-2 space-y-1 text-xs text-stone-600 dark:text-stone-300">
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    {selectedCustomer.email}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    {selectedCustomer.phone}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {selectedCustomer.city}
                  </p>
                </div>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  Favorite Dish: <strong className="text-stone-800 dark:text-stone-200">{selectedCustomer.favoriteDish}</strong>
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3">
                  Order History
                </h4>
                {selectedCustomer.orderHistory.length === 0 ? (
                  <p className="text-xs text-stone-500 dark:text-stone-400">No past orders recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.orderHistory.map((h) => (
                      <div
                        key={h.orderNumber}
                        className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-stone-900 dark:text-stone-100">{h.orderNumber}</span>
                          <span className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                            ${h.total.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-stone-700 dark:text-stone-300">{h.itemsSummary}</p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 capitalize">
                          {h.date} · {h.serviceType} · {h.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-500">Select a customer to view contact details and order history.</p>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                Add New Customer Contact
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">City, State</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-xs font-semibold text-stone-600 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
