import { MealItem, SubscriptionPlan, UserSubscription, DeliveryTracking, AppNotification, BlogPost } from '../types/meal';

export const HERO_IMAGE = '/src/assets/images/hero_gourmet_dish_1794484423640.jpg';
export const CHEF_KITCHEN_IMAGE = '/src/assets/images/chef_prep_kitchen_1794484426322.jpg';
export const STEAK_MEAL_IMAGE = '/src/assets/images/meal_steak_chimichurri_1794484424559.jpg';
export const CHICKEN_MEAL_IMAGE = '/src/assets/images/meal_herb_chicken_1794484425605.jpg';
export const SALMON_BOWL_IMAGE = '/src/assets/images/meal_salmon_bowl_1794484426040.jpg';

// New specialized section images
export const BREAKFAST_AVOCADO_TOAST = '/src/assets/images/breakfast_avocado_toast_1794486517872.jpg';
export const BREAKFAST_SHAKSHUKA = '/src/assets/images/breakfast_shakshuka_1794486518901.jpg';
export const BREAKFAST_PANCAKES = '/src/assets/images/breakfast_pancakes_1794486518986.jpg';
export const LUNCH_WAGYU_BURGER = '/src/assets/images/lunch_wagyu_burger_1794486520136.jpg';
export const DINNER_SHORT_RIB = '/src/assets/images/dinner_braised_shortrib_1794486521238.jpg';

export const MEALS_CATALOG: MealItem[] = [
  // ================= MORNING BREAKFAST SECTION =================
  {
    id: 'bf-01',
    name: 'Heritage Poached Eggs & Avocado Tartine',
    subtitle: 'Rustic sourdough, watermelon radish, baby watercress & Aleppo citrus vinaigrette',
    description: 'Two pasture-raised organic eggs poached soft over house-grilled country sourdough, layered with crushed Hass avocado, crisp watermelon radishes, organic baby watercress, and Sicilian extra virgin olive oil.',
    category: 'breakfast',
    price: 16.50,
    image: BREAKFAST_AVOCADO_TOAST,
    macros: {
      calories: 460,
      protein: 24,
      carbs: 38,
      fat: 22,
      fiber: 9,
      sodium: 410
    },
    tags: ['dairy-free', 'high-protein'],
    ingredients: [
      'Pasture-Raised Organic Eggs',
      'Artisan Levain Sourdough',
      'Hass Avocado',
      'Watermelon & Red Radishes',
      'Organic Baby Watercress',
      'Maldon Flaky Sea Salt',
      'Aleppo Pepper Flakes',
      'Cold-Pressed EVOO'
    ],
    allergens: ['Egg', 'Wheat'],
    chefNote: 'Pasture-raised eggs sourced from Vital Farms. Enjoy warm or room temperature.',
    heatingInstructions: 'Toast bread lightly if desired. Microwave eggs on 50% power for 20 seconds.',
    badge: 'Morning Signature'
  },
  {
    id: 'bf-02',
    name: 'Cast-Iron Heirloom Shakshuka',
    subtitle: 'San Marzano tomatoes, roasted peppers, crumbled sheep feta & artisan flatbread',
    description: 'Slow-simmered organic San Marzano plum tomatoes with sweet roasted bell peppers, cumin, paprika, and garlic, gently cradling two soft-poached farm eggs and topped with aged Greek sheep feta and fresh cilantro.',
    category: 'breakfast',
    price: 17.00,
    image: BREAKFAST_SHAKSHUKA,
    macros: {
      calories: 440,
      protein: 26,
      carbs: 34,
      fat: 20,
      fiber: 7,
      sodium: 460
    },
    tags: ['gluten-free', 'keto'],
    ingredients: [
      'San Marzano Organic Tomatoes',
      'Pasture-Raised Eggs',
      'Red & Yellow Bell Peppers',
      'Imported Sheep Milk Feta',
      'Ground Cumin & Smoked Paprika',
      'Fresh Flat-Leaf Cilantro',
      'Extra Virgin Olive Oil'
    ],
    allergens: ['Egg', 'Milk'],
    chefNote: 'Simmered in cast iron for deep caramelization and lycopene richness.',
    heatingInstructions: 'Warm gently in skillet for 3 minutes or microwave for 1 min 45 sec.',
    badge: 'Chef Favorite'
  },
  {
    id: 'bf-03',
    name: 'Wild Blueberry Ricotta Protein Pancakes',
    subtitle: 'Golden rolled oat batter, organic maple syrup & whipped sweet mascarpone',
    description: 'Fluffy golden pancakes crafted with gluten-free rolled oat flour and whole-milk ricotta, folded with organic Maine blueberries and blackberries, served with pure Vermont grade-A amber maple syrup.',
    category: 'breakfast',
    price: 15.50,
    image: BREAKFAST_PANCAKES,
    macros: {
      calories: 490,
      protein: 32,
      carbs: 56,
      fat: 14,
      fiber: 8,
      sodium: 380
    },
    tags: ['gluten-free', 'high-protein'],
    ingredients: [
      'Gluten-Free Rolled Oat Flour',
      'Artisan Whole Milk Ricotta',
      'Organic Wild Maine Blueberries',
      'Blackberries',
      'Pure Vermont Maple Syrup',
      'Whipped Mascarpone Butter',
      'Pasture-Raised Egg Whites',
      'Madagascar Vanilla'
    ],
    allergens: ['Milk', 'Egg'],
    chefNote: '32g clean morning protein with natural sustained-release carbohydrates.',
    heatingInstructions: 'Microwave pancakes for 1 minute on high; warm maple syrup cup separately for 10 seconds.',
    badge: 'Guest Favorite'
  },
  {
    id: 'bf-04',
    name: 'Artisan Egg White Frittata & Turkey Bacon',
    subtitle: 'Baby spinach, roasted peppers, goat cheese crumble & breakfast potatoes',
    description: 'Fluffy baked cage-free egg white frittata folded with tender baby spinach, roasted sweet peppers, and mild French goat cheese, paired with crispy uncured nitrate-free turkey bacon.',
    category: 'breakfast',
    price: 14.95,
    image: HERO_IMAGE,
    macros: {
      calories: 360,
      protein: 38,
      carbs: 18,
      fat: 12,
      fiber: 4,
      sodium: 440
    },
    tags: ['gluten-free', 'high-protein', 'keto'],
    ingredients: [
      'Cage-Free Egg Whites',
      'Uncured Turkey Bacon (Nitrate-Free)',
      'Baby Spinach',
      'Pasteurized Goat Cheese',
      'Yukon Gold Morning Potatoes',
      'Chives'
    ],
    allergens: ['Egg', 'Milk'],
    chefNote: 'High morning energy without heavy sluggishness. 38g protein to jumpstart your day.',
    heatingInstructions: 'Microwave 1 min 20 sec.',
    badge: 'Low Carb'
  },

  // ================= LUNCH SECTION =================
  {
    id: 'lu-01',
    name: 'Wagyu Beef & Black Truffle Smash Burger',
    subtitle: 'Aged Gruyère, caramelized balsamic onions, arugula & sweet potato frites',
    description: 'Quarter-pound 100% American Wagyu beef seared crispy with melted alpine Gruyère, balsamic-glazed shallots, baby wild arugula, and black winter truffle aioli on a toasted brioche bun, paired with rosemary sweet potato fries.',
    category: 'lunch',
    price: 21.00,
    image: LUNCH_WAGYU_BURGER,
    macros: {
      calories: 640,
      protein: 46,
      carbs: 48,
      fat: 28,
      fiber: 6,
      sodium: 580
    },
    tags: ['high-protein'],
    ingredients: [
      'American Wagyu Ground Beef',
      'Aged Swiss Gruyère',
      'Caramelized Spanish Onions',
      'Wild Baby Arugula',
      'French Black Winter Truffle Aioli',
      'Artisan Brioche Bun',
      'Garnet Sweet Potato Wedges',
      'Fresh Rosemary & Sea Salt'
    ],
    allergens: ['Wheat', 'Milk', 'Egg'],
    chefNote: 'Ground fresh daily from prime chuck and brisket cuts.',
    heatingInstructions: 'Toast bun in toaster or oven. Warm patty and fries at 375°F for 4 mins.',
    badge: 'Lunch Special'
  },
  {
    id: 'lu-02',
    name: 'Gourmet Teriyaki Salmon Wellness Bowl',
    subtitle: 'Avocado slices, edamame, pickled ginger & toasted sesame jasmine rice',
    description: 'Char-glazed wild salmon fillet served over fluffy jasmine rice with sliced Hass avocado, organic steamed edamame, crisp pickled pink ginger, and a light gluten-free tamari sesame drizzle.',
    category: 'lunch',
    price: 19.50,
    image: SALMON_BOWL_IMAGE,
    macros: {
      calories: 540,
      protein: 41,
      carbs: 48,
      fat: 19,
      fiber: 8,
      sodium: 460
    },
    tags: ['gluten-free', 'dairy-free', 'high-protein'],
    ingredients: [
      'Wild Sockeye Salmon',
      'Steamed Jasmine Rice',
      'Hass Avocado',
      'Organic Shelled Edamame',
      'Pickled Sushi Ginger',
      'Gluten-Free Tamari Soy Sauce',
      'Black & White Sesame Seeds'
    ],
    allergens: ['Fish', 'Soy'],
    chefNote: 'Enjoy hot or chilled as a refreshing lunchtime grain bowl.',
    heatingInstructions: 'Microwave 1 min 30 sec (set fresh avocado cup aside first).',
    badge: 'Trending'
  },
  {
    id: 'lu-03',
    name: 'Sous-Vide Lemon Herb Chicken Breast',
    subtitle: 'Haricots verts, glazed heirloom carrots & ancient grain pilaf',
    description: 'Organic free-range chicken breast slow-cooked sous-vide for 3 hours at 145°F for unmatched tenderness, garnished with thyme, accompanied by French green beans and colorful heirloom baby carrots.',
    category: 'lunch',
    price: 18.50,
    image: CHICKEN_MEAL_IMAGE,
    macros: {
      calories: 450,
      protein: 52,
      carbs: 32,
      fat: 11,
      fiber: 7,
      sodium: 390
    },
    tags: ['gluten-free', 'high-protein', 'dairy-free', 'low-sodium'],
    ingredients: [
      'Free-Range Chicken Breast',
      'Organic French Haricots Verts',
      'Rainbow Heirloom Carrots',
      'Ancient Grains Blend (Millet & Farro)',
      'Fresh Thyme & Rosemary',
      'Lemon Peel Infusion'
    ],
    allergens: [],
    chefNote: '52g ultra-clean lean protein with less than 400mg sodium.',
    heatingInstructions: 'Microwave 2 minutes on high, let sit for 30 seconds before lifting aroma lid.',
    badge: 'Athlete Fuel'
  },
  {
    id: 'lu-04',
    name: 'Mediterranean Charred Tofu & Puy Lentils',
    subtitle: 'Spiced French lentils, roasted zucchini, sun-dried tomato tapenade',
    description: 'Crispy organic artisan tofu steaks marinated in oregano and lemon, laid atop warm French green lentils with slow-roasted summer zucchini and rich sun-dried tomato tapenade.',
    category: 'lunch',
    price: 16.50,
    image: CHICKEN_MEAL_IMAGE,
    macros: {
      calories: 420,
      protein: 34,
      carbs: 42,
      fat: 14,
      fiber: 12,
      sodium: 360
    },
    tags: ['gluten-free', 'dairy-free', 'plant-based', 'high-protein'],
    ingredients: [
      'Non-GMO Sprouted Tofu',
      'Organic French Puy Lentils',
      'Yellow & Green Squash',
      'Sun-Dried Italian Tomatoes',
      'Kalamata Olive Paste',
      'Fresh Oregano'
    ],
    allergens: ['Soy'],
    chefNote: '100% plant-based with 12g of prebiotic digestive fiber and 34g protein.',
    heatingInstructions: 'Heat for 2 minutes in container or warm gently in a pan.',
    badge: '100% Vegan'
  },

  // ================= DINNER DINING SECTION =================
  {
    id: 'dn-01',
    name: '12-Hour Red Wine Braised Beef Short Rib',
    subtitle: 'Creamy parsnip mousseline, butter-glazed baby carrots & demi-glace reduction',
    description: 'Prime Angus beef short rib slow-braised for 12 hours in Napa Cabernet Sauvignon, bone broth, and aromatics until fork-tender, served over a velvety parsnip purée with glazed heirloom carrots and rich natural reduction.',
    category: 'dinner',
    price: 34.00,
    image: DINNER_SHORT_RIB,
    macros: {
      calories: 610,
      protein: 50,
      carbs: 28,
      fat: 26,
      fiber: 6,
      sodium: 520
    },
    tags: ['gluten-free', 'high-protein'],
    ingredients: [
      'Prime Angus Beef Short Rib',
      'Napa Valley Cabernet Sauvignon',
      'Roasted Organic Parsnips',
      'Glazed Rainbow Baby Carrots',
      'Veal Bone Stock Reduction',
      'Fresh Thyme & Bay Leaves',
      'Grass-Fed French Butter'
    ],
    allergens: ['Milk'],
    chefNote: 'Our flagship dinner entrée. Braised low-and-slow for maximum gelatin richness.',
    heatingInstructions: 'Oven bake at 350°F for 8 minutes, or microwave for 2 mins 30 sec.',
    badge: "Executive Chef's Table"
  },
  {
    id: 'dn-02',
    name: 'Grilled Grass-Fed Filet Mignon & Chimichurri',
    subtitle: 'Charred broccolini, roasted sweet potato wedges & herb drizzle',
    description: 'Tender cuts of 100% pasture-raised tenderloin seared over open flame, paired with caramelized sweet potato wedges, fire-kissed broccolini florets, and our house herbaceous parsley-garlic chimichurri.',
    category: 'dinner',
    price: 36.50,
    image: STEAK_MEAL_IMAGE,
    macros: {
      calories: 520,
      protein: 48,
      carbs: 34,
      fat: 20,
      fiber: 6,
      sodium: 480
    },
    tags: ['gluten-free', 'high-protein', 'paleo'],
    ingredients: [
      'Grass-Fed Beef Tenderloin',
      'Organic Broccolini',
      'Roasted Garnet Yams',
      'Cold-Pressed Extra Virgin Olive Oil',
      'Flat-Leaf Italian Parsley',
      'Red Wine Vinegar',
      'Minced Garlic',
      'Pink Himalayan Sea Salt'
    ],
    allergens: [],
    chefNote: 'Chef Marcus recommends reheating at 350°F for 4 minutes for medium-rare center.',
    heatingInstructions: 'Remove clear lid & sauce cup. Microwave on HIGH for 2 mins, or bake at 350°F for 7 mins.',
    badge: 'Prime Cut'
  },
  {
    id: 'dn-03',
    name: 'Pan-Seared Wild King Salmon & Lemon Dill',
    subtitle: 'Roasted asparagus, lemon dill herb reduction & tricolor Andean quinoa',
    description: 'Sustainably wild-caught Alaskan king salmon crisped to golden perfection, plated over fluffy tricolor quinoa infused with lemon zest, alongside tender asparagus spears and dill reduction.',
    category: 'dinner',
    price: 32.00,
    image: HERO_IMAGE,
    macros: {
      calories: 490,
      protein: 44,
      carbs: 26,
      fat: 22,
      fiber: 5,
      sodium: 420
    },
    tags: ['gluten-free', 'dairy-free', 'keto', 'high-protein'],
    ingredients: [
      'Wild Alaskan King Salmon',
      'Tricolor Organic Quinoa',
      'Fresh Jumbo Asparagus',
      'Fresh Dill',
      'Organic Meyer Lemon',
      'Shallots',
      'Cold-Pressed Olive Oil',
      'Sea Salt'
    ],
    allergens: ['Fish'],
    chefNote: 'Rich in Omega-3 fatty acids and vitamin D. Plated with natural edible micro-petals.',
    heatingInstructions: 'Microwave 1 min 45 sec. Drizzle warmed lemon dill emulsion over salmon.',
    badge: 'Wild Seafood'
  },
  {
    id: 'dn-04',
    name: 'Chipotle Braised Kurobuta Pork Shoulder',
    subtitle: 'Cilantro lime cauliflower rice, charred sweet corn & avocado salsa',
    description: 'Kurobuta heritage pork slow-simmered for 8 hours with chipotle chilies and citrus, resting on light cilantro cauliflower rice with fire-roasted corn and roasted tomatillo salsa.',
    category: 'dinner',
    price: 28.00,
    image: STEAK_MEAL_IMAGE,
    macros: {
      calories: 510,
      protein: 42,
      carbs: 22,
      fat: 26,
      fiber: 6,
      sodium: 490
    },
    tags: ['gluten-free', 'dairy-free', 'paleo', 'keto'],
    ingredients: [
      'Heritage Kurobuta Pork Shoulder',
      'Riced Cauliflower',
      'Chipotle Pepper Puree',
      'Fresh Cilantro & Lime',
      'Roasted Corn Kernels',
      'Tomatillos'
    ],
    allergens: [],
    chefNote: 'Melt-in-your-mouth tender texture with deep smoky undertones.',
    heatingInstructions: 'Microwave 2 mins on high.',
    badge: 'Heritage Breed'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-6',
    name: 'Executive Dining Plan',
    mealsPerWeek: 6,
    pricePerMeal: 19.50,
    weeklyTotal: 117.00,
    tagline: 'Gourmet restaurant dinners & lunches delivered fresh to your residence',
    features: [
      '6 Restaurant-Grade Plated Entrées / Week',
      'Full Selection from Breakfast, Lunch & Dinner',
      'Temperature-Controlled Cold-Chain Courier',
      'Skip or Pause Anytime with 1 Click',
      'Precision Nutritional Macro Breakdown'
    ]
  },
  {
    id: 'plan-10',
    name: 'Epicurean Lifestyle',
    mealsPerWeek: 10,
    pricePerMeal: 17.80,
    weeklyTotal: 178.00,
    tagline: 'Complete weekday lunches and fine dining dinners covered',
    features: [
      '10 Chef Entrées / Week (Breakfast, Lunch, Dinner)',
      'Complimentary Nationwide Refrigerated Delivery',
      'Priority Chef Table Batch Allocation',
      'Free Ingredient & Side Customizations Included',
      'Flexible Delivery Day Selection',
      'Automated Stripe Recurring Billing'
    ],
    popular: true
  },
  {
    id: 'plan-14',
    name: 'Sommelier & Chef Connoisseur',
    mealsPerWeek: 14,
    pricePerMeal: 16.50,
    weeklyTotal: 231.00,
    tagline: 'The ultimate luxury: Breakfast, Lunch & Dinner every day',
    features: [
      '14 High-End Dining Entrées / Week',
      'Athlete & Double-Portion Upgrades Supported',
      'Priority Overnight Chilled Delivery',
      'Exclusive Access to Reserve Off-Menu Specials',
      'Direct Chef & Sommelier Concierge Support',
      'Pause, Skip or Cancel with Zero Penalty'
    ]
  }
];

export const INITIAL_USER_SUBSCRIPTION: UserSubscription = {
  id: 'sub_clean_88921',
  planId: 'plan-10',
  status: 'active',
  frequency: 'weekly',
  deliveryDay: 'Sunday',
  nextDeliveryDate: 'Sunday, Nov 16, 2026',
  nextBillingDate: 'Wednesday, Nov 12, 2026',
  selectedMealsCount: 10,
  totalMealsInPlan: 10
};

export const INITIAL_TRACKING: DeliveryTracking = {
  orderId: 'CC-98241',
  trackingNumber: '1Z992A01039841294',
  carrier: 'The Flavor House Restaurant Courier USA',
  status: 'in-transit',
  estimatedDeliveryWindow: 'Today, 11:45 AM - 1:15 PM EST',
  transitTemperature: 35.8,
  driverName: 'Marcus Tremaine',
  driverPhone: '+1 (504) 555-0182',
  driverVehicle: 'Mercedes-Benz Sprinter Refrigerated Van #08',
  currentLocation: {
    lat: 38.8951,
    lng: -77.0364,
    address: 'Constitution Ave & 14th St NW'
  },
  destination: {
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'Bethesda',
    state: 'MD',
    zip: '20814'
  },
  timeline: [
    {
      time: '6:15 AM EST',
      title: 'Dishes Prepared in Restaurant Kitchen',
      description: 'Executive chef finished plating and sealing breakfast, lunch and dinner entrées with micro herbs.',
      completed: true
    },
    {
      time: '7:40 AM EST',
      title: 'Loaded onto Refrigerated Courier',
      description: 'Van interior locked at optimal 35°F cooling curve. Cold-chain telematics verified.',
      completed: true
    },
    {
      time: '10:15 AM EST',
      title: 'Out for Local Delivery',
      description: 'Driver Marcus Tremaine is currently 4 stops away from your delivery address.',
      completed: true
    },
    {
      time: 'Est. 12:15 PM EST',
      title: 'Doorstep Dropoff & Photo Confirmation',
      description: 'Driver will leave insulated dining box at your door and send instant push photo.',
      completed: false
    }
  ]
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Your Dining Box is Out for Delivery! 🚚',
    message: 'Driver Marcus is en route in refrigerated van #08. Estimated delivery window: 11:45 AM - 1:15 PM.',
    timestamp: '18 minutes ago',
    type: 'delivery',
    read: false,
    actionUrl: '#tracker'
  },
  {
    id: 'notif-2',
    title: 'Dinner Dining Menu Updated 🍽️',
    message: 'Taste our new 12-Hour Braised Short Rib and Wagyu Truffle Smash Burger.',
    timestamp: '2 hours ago',
    type: 'order',
    read: false,
    actionUrl: '#menu'
  },
  {
    id: 'notif-3',
    title: 'Stripe Recurring Billing Notice 💳',
    message: 'Upcoming dining subscription charge of $178.00 scheduled for Nov 12. Edit your meals before Wednesday.',
    timestamp: 'Yesterday',
    type: 'subscription',
    read: true,
    actionUrl: '#dashboard'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Dr. Jennifer Vance, MD',
    role: 'Sports Medicine Physician, New York',
    quote: 'The Flavor House has been a game changer for my clinic days. The Morning Shakshuka and Dinner Braised Short Rib taste like a private chef just stepped out of my kitchen.',
    rating: 5,
    tag: 'Verified Subscriber (18 months)'
  },
  {
    id: '2',
    name: 'David Sterling',
    role: 'Tech Executive, Austin TX',
    quote: 'The Wagyu Truffle Burger for lunch and Filet Mignon for dinner are sensational. Having Stripe recurring payments that I can pause whenever I travel makes this unbeatable.',
    rating: 5,
    tag: 'Epicurean Lifestyle Plan'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Sommelier & Restaurateur, Miami',
    quote: 'The wild king salmon and avocado tartine arrive genuinely fresh, never soggy. The cold-chain delivery packaging keeps everything restaurant-grade right on my doorstep.',
    rating: 5,
    tag: 'Executive Dining Plan'
  }
];

export const BUILDER_PROTEINS = [
  { id: 'b-shortrib', name: '12-Hour Braised Short Rib', calories: 340, protein: 44, carbs: 4, fat: 16, price: 12.00 },
  { id: 'b-salmon', name: 'Wild Alaskan King Salmon', calories: 280, protein: 36, carbs: 0, fat: 14, price: 10.50 },
  { id: 'b-steak', name: 'Grass-Fed Filet Mignon', calories: 310, protein: 42, carbs: 0, fat: 15, price: 11.50 },
  { id: 'b-chicken', name: 'Free-Range Lemon Herb Chicken', calories: 220, protein: 40, carbs: 0, fat: 5, price: 8.50 },
  { id: 'b-tofu', name: 'Crispy Organic Sprouted Tofu', calories: 180, protein: 24, carbs: 4, fat: 8, price: 7.00 }
];

export const BUILDER_CARBS = [
  { id: 'c-parsnip', name: 'Velvety Parsnip Purée', calories: 120, protein: 3, carbs: 22, fat: 2, price: 4.50 },
  { id: 'c-quinoa', name: 'Tricolor Andean Quinoa', calories: 140, protein: 5, carbs: 24, fat: 2, price: 3.50 },
  { id: 'c-sweet-pot', name: 'Roasted Garnet Sweet Potato', calories: 130, protein: 2, carbs: 30, fat: 1, price: 3.50 },
  { id: 'c-jasmine', name: 'Steamed Jasmine Rice', calories: 160, protein: 3, carbs: 36, fat: 0, price: 3.00 },
  { id: 'c-cauli', name: 'Cilantro Cauliflower Rice (Low-Carb)', calories: 45, protein: 2, carbs: 6, fat: 1, price: 4.00 }
];

export const BUILDER_VEGGIES = [
  { id: 'v-carrots', name: 'Butter-Glazed Rainbow Carrots', calories: 55, protein: 1, carbs: 11, fat: 1, price: 3.50 },
  { id: 'v-broccolini', name: 'Charred Broccolini Florets', calories: 45, protein: 3, carbs: 6, fat: 1, price: 3.50 },
  { id: 'v-asparagus', name: 'Roasted Jumbo Asparagus', calories: 40, protein: 3, carbs: 5, fat: 1, price: 4.00 },
  { id: 'v-beans', name: 'French Haricots Verts', calories: 35, protein: 2, carbs: 7, fat: 0, price: 3.25 }
];

export const BUILDER_SAUCES = [
  { id: 's-demiglace', name: 'Red Wine Demi-Glace Reduction', calories: 75, protein: 2, carbs: 3, fat: 5, price: 2.00 },
  { id: 's-chimichurri', name: 'Artisan Parsley Chimichurri', calories: 70, protein: 1, carbs: 1, fat: 7, price: 1.50 },
  { id: 's-dill', name: 'Lemon Herb Dill Emulsion', calories: 60, protein: 1, carbs: 2, fat: 6, price: 1.50 },
  { id: 's-truffle', name: 'Black Truffle Aioli', calories: 95, protein: 1, carbs: 1, fat: 10, price: 2.00 }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Inside Our 35°F Cold-Chain Kitchen: Why Never Freezing Matters',
    excerpt: 'Discover how micro-batch sous-vide cooking and rapid chill sealing preserve natural textures, nutrients, and restaurant-caliber flavor without a single preservative.',
    content: [
      'Traditional meal delivery brands rely on flash-freezing to extend shelf life across regional warehouses. While freezing slows spoilage, ice crystals rupture delicate cellular structures in organic greens, wild seafood, and artisan herbs.',
      'At The Flavor House, every entrée is prepared to order in small culinary batches, cooled rapidly using commercial blast chillers, and vacuum-sealed under strict 35°F–38°F monitoring.',
      'From our New Orleans kitchen to doorsteps across 48 states, insulated cotton-fiber liners and calibrated gel packs maintain peak freshness so a 3-minute warm-up tastes like table service.'
    ],
    category: 'Culinary Craft',
    author: 'Chef Marcus Laurent',
    authorRole: 'Executive Culinary Director',
    publishedAt: 'Nov 12, 2026',
    readTime: '4 min read',
    image: CHEF_KITCHEN_IMAGE,
    status: 'approved'
  },
  {
    id: 'blog-2',
    title: 'Wild Alaskan King Salmon vs. Farmed: The Omega-3 Breakdown',
    excerpt: 'Why sourcing line-caught Pacific salmon yields 44g of bioavailable protein alongside superior astaxanthin antioxidants and rich, buttery flavor.',
    content: [
      'Not all salmon is created equal. Wild Alaskan King salmon swim thousands of miles in frigid Pacific currents, developing firm marbling rich in EPA and DHA omega-3 fatty acids.',
      'Our culinary nutrition team pairs each 6oz fillet with lemon-dill reduction and tricolor Andean quinoa, delivering sustained metabolic energy without afternoon crashes.',
      'Every catch is traceable back to certified sustainable Alaskan fisheries and arrives chilled within 48 hours of harvest.'
    ],
    category: 'Nutrition Science',
    author: 'Dr. Maya Lin, RD',
    authorRole: 'Lead Sports Dietitian',
    publishedAt: 'Nov 09, 2026',
    readTime: '5 min read',
    image: SALMON_BOWL_IMAGE,
    status: 'approved'
  },
  {
    id: 'blog-3',
    title: 'Mastering Morning Macros Without Sacrificing Café Indulgence',
    excerpt: 'How pasture-raised poached eggs, levain sourdough fermentation, and cold-pressed avocado oil set stable blood glucose curves for high-output mornings.',
    content: [
      'Starting your morning with refined pastries spikes insulin and leads to mid-morning fatigue. Yet clinical nutrition does not have to mean dry egg whites and plain oats.',
      'Long-fermented levain sourdough breaks down phytic acid and lowers glycemic load, while pairing healthy monounsaturated fats from Hass avocado slows gastric emptying for 4+ hours of steady focus.',
      'Explore our Morning Breakfast collection for chef-crafted shakshuka, wild blueberry ricotta pancakes, and artisan tartines.'
    ],
    category: 'Morning Rituals',
    author: 'Chef Claire Beaumont',
    authorRole: 'Breakfast & Pastry Lead',
    publishedAt: 'Nov 05, 2026',
    readTime: '3 min read',
    image: BREAKFAST_AVOCADO_TOAST,
    status: 'approved'
  },
  {
    id: 'blog-4',
    title: 'The Art of the 12-Hour Cabernet Braise for Tender Short Ribs',
    excerpt: 'Slow-simmering prime grass-fed beef short ribs at low heat melts tough collagen into silky gelatin while keeping saturated fats balanced.',
    content: [
      'Great French-American braising is an exercise in patience. By searing pasture-raised short ribs in cast iron before resting them in Napa Cabernet, thyme, and roasted mirepoix for 12 hours, tough connective tissue transforms effortlessly.',
      'We chill and skim the natural jus overnight so only rich, concentrated demi-glace remains—never heavy excess grease.',
      'Served over velvety parsnip purée and butter-glazed heirloom carrots, it is fine dining made effortless on weeknights.'
    ],
    category: 'Chef Techniques',
    author: 'Chef Marcus Laurent',
    authorRole: 'Executive Culinary Director',
    publishedAt: 'Nov 02, 2026',
    readTime: '4 min read',
    image: DINNER_SHORT_RIB,
    status: 'approved'
  },
  {
    id: 'blog-5',
    title: 'Grass-Fed Chimichurri Filet: Fueling Recovery After Training',
    excerpt: 'Combining 42g of complete amino acids with anti-inflammatory parsley, oregano, and garlic polyphenols helps athletes bounce back faster.',
    content: [
      'Post-workout recovery depends on two pillars: hitting 35–45g of leucine-rich protein within two hours of training and calming exercise-induced oxidative stress.',
      'Our grass-fed filet mignon delivers ultra-lean iron, zinc, and B-vitamins, elevated by vibrant fresh-chopped Argentine chimichurri herbs rather than heavy cream sauces.',
      'Customize your portion up to +40% Athlete Protein directly from any dinner card or inside our Build-Your-Own Macro Studio.'
    ],
    category: 'Performance Fuel',
    author: 'Dr. Maya Lin, RD',
    authorRole: 'Lead Sports Dietitian',
    publishedAt: 'Oct 28, 2026',
    readTime: '4 min read',
    image: STEAK_MEAL_IMAGE,
    status: 'approved'
  },
  {
    id: 'blog-6',
    title: 'Winter Cast-Iron Shakshuka: Spices That Support Gut & Metabolic Health',
    excerpt: 'How smoked paprika, cumin, and organic San Marzano lycopene work synergistically with pasture-raised egg yolks for clean morning energy.',
    content: [
      'Warming culinary spices do far more than brighten flavor—cumin and smoked paprika contain bioactive polyphenols that support healthy digestion and post-meal glucose stability.',
      'Simmered gently in cast iron, our San Marzano tomato base unlocks bioavailable lycopene paired with healthy olive oil fats.'
    ],
    category: 'Culinary Craft',
    author: 'Chef Claire Beaumont',
    authorRole: 'Breakfast & Pastry Lead',
    publishedAt: 'Nov 15, 2026',
    readTime: '3 min read',
    image: BREAKFAST_SHAKSHUKA,
    status: 'pending'
  }
];

