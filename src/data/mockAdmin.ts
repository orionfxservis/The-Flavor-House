import {
  AdminUser,
  RestaurantOrder,
  RestaurantTable,
  TableReservation,
  StaffMember,
  ExpenseEntry,
  CustomerRecord,
  TestimonialItem
} from '../types/admin';

export const TODAY_ISO = '2026-11-15';

export interface AdminCredentialEntry {
  user: AdminUser;
  password: string;
}

export const ADMIN_CREDENTIALS: AdminCredentialEntry[] = [
  {
    password: 'Owner2026!',
    user: {
      id: 'adm-owner',
      name: 'Julian Vance',
      email: 'owner@theflavorhouse.com',
      role: 'owner',
      title: 'Restaurant Owner & Executive Partner',
      avatarInitials: 'JV'
    }
  },
  {
    password: 'Manager2026!',
    user: {
      id: 'adm-manager',
      name: 'Sophia Chen',
      email: 'manager@theflavorhouse.com',
      role: 'manager',
      title: 'General Operations Manager',
      avatarInitials: 'SC'
    }
  },
  {
    password: 'Cashier2026!',
    user: {
      id: 'adm-cashier',
      name: 'Devon Brooks',
      email: 'cashier@theflavorhouse.com',
      role: 'cashier',
      title: 'Front-of-House POS Cashier',
      avatarInitials: 'DB'
    }
  }
];

export const INITIAL_RESTAURANT_ORDERS: RestaurantOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'FH-4108',
    customerName: 'Dr. Jennifer Vance',
    customerPhone: '+1 (212) 555-0148',
    serviceType: 'dine-in',
    tableNumber: 'T2',
    items: [
      { mealId: 'dn-01', name: '12-Hour Cabernet Braised Short Rib', quantity: 2, unitPrice: 34.00 },
      { mealId: 'bf-01', name: 'Heritage Poached Eggs & Avocado Tartine', quantity: 1, unitPrice: 16.50 }
    ],
    subtotal: 84.50,
    tax: 6.97,
    total: 91.47,
    status: 'preparing',
    paymentMethod: 'Card (Stripe)',
    createdAt: '11:42 AM',
    dateISO: TODAY_ISO
  },
  {
    id: 'ord-102',
    orderNumber: 'FH-4107',
    customerName: 'David Sterling',
    customerPhone: '+1 (512) 555-0192',
    serviceType: 'delivery',
    deliveryAddress: '742 Congress Ave, Apt 14B, Austin, TX',
    items: [
      { mealId: 'ln-01', name: 'American Wagyu Truffle Smash Burger', quantity: 2, unitPrice: 21.50 },
      { mealId: 'dn-02', name: 'Grass-Fed Chimichurri Filet Mignon', quantity: 1, unitPrice: 24.50 }
    ],
    subtotal: 67.50,
    tax: 5.57,
    total: 73.07,
    status: 'new',
    paymentMethod: 'Apple Pay',
    createdAt: '11:36 AM',
    dateISO: TODAY_ISO
  },
  {
    id: 'ord-103',
    orderNumber: 'FH-4106',
    customerName: 'Elena Rostova',
    customerPhone: '+1 (305) 555-0174',
    serviceType: 'takeaway',
    items: [
      { mealId: 'ln-02', name: 'Wild Alaskan Salmon Wellness Bowl', quantity: 2, unitPrice: 19.95 },
      { mealId: 'bf-03', name: 'Wild Blueberry Ricotta Protein Pancakes', quantity: 1, unitPrice: 15.50 }
    ],
    subtotal: 55.40,
    tax: 4.57,
    total: 59.97,
    status: 'ready',
    paymentMethod: 'Card (Stripe)',
    createdAt: '11:18 AM',
    dateISO: TODAY_ISO
  },
  {
    id: 'ord-104',
    orderNumber: 'FH-4105',
    customerName: 'Marcus Henderson',
    customerPhone: '+1 (504) 555-0133',
    serviceType: 'dine-in',
    tableNumber: 'T5',
    items: [
      { mealId: 'bf-02', name: 'Cast-Iron Heirloom Shakshuka', quantity: 2, unitPrice: 17.00 },
      { mealId: 'bf-01', name: 'Heritage Poached Eggs & Avocado Tartine', quantity: 2, unitPrice: 16.50 }
    ],
    subtotal: 67.00,
    tax: 5.53,
    total: 72.53,
    status: 'delivered',
    paymentMethod: 'Cash',
    createdAt: '09:45 AM',
    dateISO: TODAY_ISO
  },
  {
    id: 'ord-105',
    orderNumber: 'FH-4104',
    customerName: 'Priya Kapoor',
    customerPhone: '+1 (415) 555-0161',
    serviceType: 'delivery',
    deliveryAddress: '1880 Mission St, Suite 402, San Francisco, CA',
    items: [
      { mealId: 'dn-01', name: '12-Hour Cabernet Braised Short Rib', quantity: 1, unitPrice: 34.00 },
      { mealId: 'ln-01', name: 'American Wagyu Truffle Smash Burger', quantity: 1, unitPrice: 21.50 }
    ],
    subtotal: 55.50,
    tax: 4.58,
    total: 60.08,
    status: 'delivered',
    paymentMethod: 'Card (Stripe)',
    createdAt: '09:10 AM',
    dateISO: TODAY_ISO
  },
  {
    id: 'ord-106',
    orderNumber: 'FH-4092',
    customerName: 'Dr. Alex Montgomery',
    customerPhone: '+1 (504) 555-0199',
    serviceType: 'delivery',
    deliveryAddress: '1240 Magazine St, New Orleans, LA',
    items: [
      { mealId: 'dn-02', name: 'Grass-Fed Chimichurri Filet Mignon', quantity: 3, unitPrice: 24.50 },
      { mealId: 'ln-02', name: 'Wild Alaskan Salmon Wellness Bowl', quantity: 2, unitPrice: 19.95 }
    ],
    subtotal: 113.40,
    tax: 9.36,
    total: 122.76,
    status: 'delivered',
    paymentMethod: 'Card (Stripe)',
    createdAt: '06:25 PM',
    dateISO: '2026-11-14'
  }
];

export const INITIAL_TABLES: RestaurantTable[] = [
  { id: 'tbl-1', tableNumber: 'T1', seats: 2, zone: 'Main Dining', status: 'available' },
  { id: 'tbl-2', tableNumber: 'T2', seats: 4, zone: 'Main Dining', status: 'occupied', currentGuests: 3, assignedServer: 'Liam O’Connor' },
  { id: 'tbl-3', tableNumber: 'T3', seats: 4, zone: 'Main Dining', status: 'reserved', assignedServer: 'Liam O’Connor' },
  { id: 'tbl-4', tableNumber: 'T4', seats: 2, zone: 'Chef Counter', status: 'available' },
  { id: 'tbl-5', tableNumber: 'T5', seats: 6, zone: 'Patio Garden', status: 'occupied', currentGuests: 4, assignedServer: 'Aria Patel' },
  { id: 'tbl-6', tableNumber: 'T6', seats: 4, zone: 'Patio Garden', status: 'available' },
  { id: 'tbl-7', tableNumber: 'T7', seats: 8, zone: 'Private Lounge', status: 'reserved', assignedServer: 'Aria Patel' },
  { id: 'tbl-8', tableNumber: 'T8', seats: 2, zone: 'Chef Counter', status: 'available' }
];

export const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'res-1',
    tableId: 'tbl-3',
    tableNumber: 'T3',
    customerName: 'Claire Montgomery',
    customerPhone: '+1 (504) 555-0128',
    customerEmail: 'claire.m@example.com',
    guests: 4,
    dateISO: TODAY_ISO,
    timeSlot: '01:00 PM',
    notes: 'Gluten-free bread preference noted.',
    status: 'confirmed'
  },
  {
    id: 'res-2',
    tableId: 'tbl-7',
    tableNumber: 'T7',
    customerName: 'Sterling Executive Group',
    customerPhone: '+1 (512) 555-0192',
    customerEmail: 'd.sterling@example.com',
    guests: 7,
    dateISO: TODAY_ISO,
    timeSlot: '07:30 PM',
    notes: 'Anniversary tasting dinner — sommelier pairing.',
    status: 'confirmed'
  },
  {
    id: 'res-3',
    tableId: 'tbl-2',
    tableNumber: 'T2',
    customerName: 'Dr. Jennifer Vance',
    customerPhone: '+1 (212) 555-0148',
    customerEmail: 'jvance.md@example.com',
    guests: 3,
    dateISO: TODAY_ISO,
    timeSlot: '11:30 AM',
    status: 'seated'
  },
  {
    id: 'res-4',
    tableId: 'tbl-6',
    tableNumber: 'T6',
    customerName: 'Natalie & Ben Pierce',
    customerPhone: '+1 (305) 555-0115',
    customerEmail: 'npierce@example.com',
    guests: 4,
    dateISO: '2026-11-16',
    timeSlot: '06:30 PM',
    notes: 'Patio window seating requested.',
    status: 'confirmed'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Julian Vance',
    role: 'Owner',
    accessLevel: 'owner',
    email: 'owner@theflavorhouse.com',
    phone: '+1 (504) 555-0101',
    status: 'on-shift',
    hourlyRate: 0,
    shifts: { Mon: '9a–6p', Tue: '9a–6p', Wed: '9a–6p', Thu: '9a–6p', Fri: '9a–8p', Sat: '12p–6p', Sun: 'Off' }
  },
  {
    id: 'st-2',
    name: 'Sophia Chen',
    role: 'Manager',
    accessLevel: 'manager',
    email: 'manager@theflavorhouse.com',
    phone: '+1 (504) 555-0114',
    status: 'on-shift',
    hourlyRate: 38,
    shifts: { Mon: '8a–5p', Tue: '8a–5p', Wed: 'Off', Thu: '10a–7p', Fri: '11a–9p', Sat: '11a–9p', Sun: '10a–6p' }
  },
  {
    id: 'st-3',
    name: 'Chef Marcus Laurent',
    role: 'Executive Chef',
    accessLevel: 'kitchen',
    email: 'chef.marcus@theflavorhouse.com',
    phone: '+1 (504) 555-0122',
    status: 'on-shift',
    hourlyRate: 46,
    shifts: { Mon: '7a–4p', Tue: '7a–4p', Wed: '7a–4p', Thu: '7a–4p', Fri: '12p–10p', Sat: '12p–10p', Sun: 'Off' }
  },
  {
    id: 'st-4',
    name: 'Devon Brooks',
    role: 'Cashier',
    accessLevel: 'cashier',
    email: 'cashier@theflavorhouse.com',
    phone: '+1 (504) 555-0145',
    status: 'on-shift',
    hourlyRate: 22,
    shifts: { Mon: 'Off', Tue: '10a–6p', Wed: '10a–6p', Thu: '10a–6p', Fri: '2p–10p', Sat: '2p–10p', Sun: '9a–5p' }
  },
  {
    id: 'st-5',
    name: 'Liam O’Connor',
    role: 'Server',
    accessLevel: 'service',
    email: 'liam.o@theflavorhouse.com',
    phone: '+1 (504) 555-0167',
    status: 'on-shift',
    hourlyRate: 19,
    shifts: { Mon: '11a–7p', Tue: '11a–7p', Wed: 'Off', Thu: '4p–10p', Fri: '4p–11p', Sat: '4p–11p', Sun: '10a–6p' }
  },
  {
    id: 'st-6',
    name: 'Marcus Tremaine',
    role: 'Delivery Courier',
    accessLevel: 'service',
    email: 'courier.marcus@theflavorhouse.com',
    phone: '+1 (504) 555-0182',
    status: 'on-shift',
    hourlyRate: 25,
    shifts: { Mon: '8a–4p', Tue: '8a–4p', Wed: '8a–4p', Thu: '8a–4p', Fri: 'Off', Sat: '9a–5p', Sun: '8a–4p' }
  }
];

export const INITIAL_EXPENSES: ExpenseEntry[] = [
  {
    id: 'exp-1',
    title: 'Organic Produce & Heirloom Greens Delivery',
    category: 'Produce & Organics',
    amount: 640.00,
    dateISO: TODAY_ISO,
    vendor: 'Crescent City Organic Farms'
  },
  {
    id: 'exp-2',
    title: 'Wild Alaskan King Salmon & Grass-Fed Beef',
    category: 'Proteins & Seafood',
    amount: 1420.00,
    dateISO: TODAY_ISO,
    vendor: 'Pacific & Pasture Provisions'
  },
  {
    id: 'exp-3',
    title: 'Insulated Thermal Box Liners & Cold Gel Packs',
    category: 'Packaging & Cold-Chain',
    amount: 315.50,
    dateISO: '2026-11-12',
    vendor: 'EcoCold Packaging USA'
  },
  {
    id: 'exp-4',
    title: 'Culinary & Front-of-House Weekly Payroll',
    category: 'Staff Payroll',
    amount: 4280.00,
    dateISO: '2026-11-10',
    vendor: 'Gusto Payroll ACH'
  }
];

export const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-1',
    name: 'Dr. Jennifer Vance, MD',
    email: 'jvance.md@example.com',
    phone: '+1 (212) 555-0148',
    city: 'New York, NY',
    loyaltyTier: 'VIP Reserve',
    totalOrders: 24,
    totalSpent: 2840.50,
    lastOrderDate: 'Nov 15, 2026',
    favoriteDish: '12-Hour Cabernet Braised Short Rib',
    orderHistory: [
      { orderNumber: 'FH-4108', date: 'Nov 15, 2026', serviceType: 'dine-in', itemsSummary: '2x Braised Short Rib, 1x Avocado Tartine', total: 91.47, status: 'preparing' },
      { orderNumber: 'FH-3994', date: 'Nov 08, 2026', serviceType: 'delivery', itemsSummary: '5x Weekly Chef Subscription Box', total: 148.00, status: 'delivered' }
    ]
  },
  {
    id: 'cust-2',
    name: 'David Sterling',
    email: 'd.sterling@example.com',
    phone: '+1 (512) 555-0192',
    city: 'Austin, TX',
    loyaltyTier: 'VIP Reserve',
    totalOrders: 19,
    totalSpent: 2195.20,
    lastOrderDate: 'Nov 15, 2026',
    favoriteDish: 'American Wagyu Truffle Smash Burger',
    orderHistory: [
      { orderNumber: 'FH-4107', date: 'Nov 15, 2026', serviceType: 'delivery', itemsSummary: '2x Wagyu Burger, 1x Filet Mignon', total: 73.07, status: 'new' },
      { orderNumber: 'FH-3912', date: 'Nov 04, 2026', serviceType: 'delivery', itemsSummary: '10-Meal Epicurean Plan Box', total: 178.00, status: 'delivered' }
    ]
  },
  {
    id: 'cust-3',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+1 (305) 555-0174',
    city: 'Miami, FL',
    loyaltyTier: 'Gold Member',
    totalOrders: 14,
    totalSpent: 1380.90,
    lastOrderDate: 'Nov 15, 2026',
    favoriteDish: 'Wild Alaskan Salmon Wellness Bowl',
    orderHistory: [
      { orderNumber: 'FH-4106', date: 'Nov 15, 2026', serviceType: 'takeaway', itemsSummary: '2x Salmon Wellness Bowl, 1x Ricotta Pancakes', total: 59.97, status: 'ready' }
    ]
  },
  {
    id: 'cust-4',
    name: 'Marcus Henderson',
    email: 'm.henderson@example.com',
    phone: '+1 (504) 555-0133',
    city: 'New Orleans, LA',
    loyaltyTier: 'Regular',
    totalOrders: 7,
    totalSpent: 512.40,
    lastOrderDate: 'Nov 15, 2026',
    favoriteDish: 'Cast-Iron Heirloom Shakshuka',
    orderHistory: [
      { orderNumber: 'FH-4105', date: 'Nov 15, 2026', serviceType: 'dine-in', itemsSummary: '2x Cast-Iron Shakshuka, 2x Avocado Tartine', total: 72.53, status: 'delivered' }
    ]
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Dr. Jennifer Vance, MD',
    role: 'Sports Medicine Physician, New York',
    quote: 'The Flavor House has been a game changer for my clinic days. The Morning Shakshuka and Dinner Braised Short Rib taste like a private chef just stepped out of my kitchen.',
    rating: 5,
    tag: 'Verified Subscriber (18 months)',
    status: 'approved',
    submittedAt: 'Nov 02, 2026'
  },
  {
    id: '2',
    name: 'David Sterling',
    role: 'Tech Executive, Austin TX',
    quote: 'The Wagyu Truffle Burger for lunch and Filet Mignon for dinner are sensational. Having Stripe recurring payments that I can pause whenever I travel makes this unbeatable.',
    rating: 5,
    tag: 'Epicurean Lifestyle Plan',
    status: 'approved',
    submittedAt: 'Nov 06, 2026'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Sommelier & Restaurateur, Miami',
    quote: 'The wild king salmon and avocado tartine arrive genuinely fresh, never soggy. The cold-chain delivery packaging keeps everything restaurant-grade right on my doorstep.',
    rating: 5,
    tag: 'Executive Dining Plan',
    status: 'approved',
    submittedAt: 'Nov 10, 2026'
  },
  {
    id: '4',
    name: 'Coach Terrence Malik',
    role: 'Strength & Conditioning Coach, Chicago',
    quote: 'Hitting 44g+ clean protein per meal without seed oils used to take me hours of Sunday prep. The Flavor House athlete portion option saved my schedule.',
    rating: 5,
    tag: 'Performance Athlete Plan',
    status: 'pending',
    submittedAt: 'Nov 15, 2026'
  },
  {
    id: '5',
    name: 'Hannah Alvarez',
    role: 'Architect, Seattle WA',
    quote: 'The Wild Blueberry Ricotta Pancakes and Herb Chicken are weekly staples for our whole household. Cold delivery arrives right on time every Sunday morning.',
    rating: 5,
    tag: 'Family Dining Plan',
    status: 'pending',
    submittedAt: 'Nov 15, 2026'
  }
];
