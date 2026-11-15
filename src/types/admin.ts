export type AdminRole = 'owner' | 'manager' | 'cashier';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  title: string;
  avatarInitials: string;
}

export type OrderServiceType = 'dine-in' | 'takeaway' | 'delivery';
export type RestaurantOrderStatus = 'new' | 'preparing' | 'ready' | 'delivered';

export interface RestaurantOrderItem {
  mealId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface RestaurantOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  serviceType: OrderServiceType;
  tableNumber?: string;
  deliveryAddress?: string;
  items: RestaurantOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: RestaurantOrderStatus;
  paymentMethod: 'Card (Stripe)' | 'Cash' | 'Apple Pay';
  createdAt: string;
  dateISO: string; // YYYY-MM-DD
}

export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  seats: number;
  zone: 'Main Dining' | 'Chef Counter' | 'Patio Garden' | 'Private Lounge';
  status: TableStatus;
  currentGuests?: number;
  assignedServer?: string;
}

export interface TableReservation {
  id: string;
  tableId: string;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  guests: number;
  dateISO: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Owner' | 'Manager' | 'Executive Chef' | 'Sous Chef' | 'Server' | 'Cashier' | 'Delivery Courier';
  accessLevel: AdminRole | 'kitchen' | 'service';
  email: string;
  phone: string;
  status: 'on-shift' | 'scheduled' | 'off-duty';
  hourlyRate: number;
  shifts: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
}

export interface ExpenseEntry {
  id: string;
  title: string;
  category: 'Produce & Organics' | 'Proteins & Seafood' | 'Packaging & Cold-Chain' | 'Staff Payroll' | 'Utilities & Rent';
  amount: number;
  dateISO: string;
  vendor: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  loyaltyTier: 'VIP Reserve' | 'Gold Member' | 'Regular';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  favoriteDish: string;
  orderHistory: {
    orderNumber: string;
    date: string;
    serviceType: OrderServiceType;
    itemsSummary: string;
    total: number;
    status: RestaurantOrderStatus;
  }[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  tag: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
}
