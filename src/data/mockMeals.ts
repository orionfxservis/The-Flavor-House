import { MealItem, SubscriptionPlan, UserSubscription, DeliveryTracking, AppNotification, BlogPost } from '../types/meal';

import heroGourmetDish from '../assets/images/hero_gourmet_dish_1794484423640.jpg';
import chefPrepKitchen from '../assets/images/chef_prep_kitchen_1794484426322.jpg';
import mealSteakChimichurri from '../assets/images/meal_steak_chimichurri_1794484424559.jpg';
import mealHerbChicken from '../assets/images/meal_herb_chicken_1794484425605.jpg';
import mealSalmonBowl from '../assets/images/meal_salmon_bowl_1794484426040.jpg';
import breakfastAvocadoToast from '../assets/images/breakfast_avocado_toast_1794486517872.jpg';
import breakfastShakshuka from '../assets/images/breakfast_shakshuka_1794486518901.jpg';
import breakfastPancakes from '../assets/images/breakfast_pancakes_1794486518986.jpg';
import breakfastHerbOmelet from '../assets/images/breakfast_herb_omelet_1794766944818.jpg';
import lunchWagyuBurger from '../assets/images/lunch_wagyu_burger_1794486520136.jpg';
import lunchHarvestSalad from '../assets/images/lunch_harvest_salad_1794766945061.jpg';
import dinnerBraisedShortrib from '../assets/images/dinner_braised_shortrib_1794486521238.jpg';
import snackGreenSmoothie from '../assets/images/snack_green_smoothie_1794766945683.jpg';
import snackChocolateTart from '../assets/images/snack_chocolate_tart_1794766945989.jpg';

export const HERO_IMAGE = heroGourmetDish;
export const CHEF_KITCHEN_IMAGE = chefPrepKitchen;
export const STEAK_MEAL_IMAGE = mealSteakChimichurri;
export const CHICKEN_MEAL_IMAGE = mealHerbChicken;
export const SALMON_BOWL_IMAGE = mealSalmonBowl;

// Specialized section images
export const BREAKFAST_AVOCADO_TOAST = breakfastAvocadoToast;
export const BREAKFAST_SHAKSHUKA = breakfastShakshuka;
export const BREAKFAST_PANCAKES = breakfastPancakes;
export const BREAKFAST_OMELET = breakfastHerbOmelet;
export const LUNCH_WAGYU_BURGER = lunchWagyuBurger;
export const LUNCH_HARVEST_SALAD = lunchHarvestSalad;
export const DINNER_SHORT_RIB = dinnerBraisedShortrib;
export const SNACK_GREEN_SMOOTHIE = snackGreenSmoothie;
export const SNACK_CHOCOLATE_TART = snackChocolateTart;

export const MEALS_CATALOG: MealItem[] = [
  // ================= BREAKFAST SECTION (Omelets, Avocado Toast, Pancakes, Fresh Bowls) =================
  {
    id: 'bf-01',
    name: 'Heritage Poached Eggs & Avocado Tartine',
    subtitle: 'Rustic sourdough, watermelon radish, baby watercress & Aleppo citrus vinaigrette',
    description: 'Two pasture-raised organic eggs poached soft over house-grilled country sourdough, layered with crushed Hass avocado, crisp watermelon radishes, organic baby watercress, and Sicilian extra virgin olive oil.',
    category: 'breakfast',
    subcategory: 'Avocado Toast',
    price: 16.50,
    image: BREAKFAST_AVOCADO_TOAST,
    nutritionVerified: true,
    macros: {
      calories: 460,
      protein: 24,
      carbs: 38,
      fat: 22,
      fiber: 9,
      sodium: 410
    },
    tags: ['vegetarian', 'dairy-free', 'high-protein'],
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
    addons: [
      { id: 'add-avocado', name: 'Extra Sliced Hass Avocado', price: 2.50, calories: 120 },
      { id: 'add-smoked-salmon', name: 'Wild Smoked Salmon (2 oz)', price: 5.50, calories: 95 },
      { id: 'add-poached-egg', name: 'Extra Pasture-Raised Egg', price: 2.00, calories: 70 }
    ],
    chefNote: 'Pasture-raised eggs sourced from Vital Farms. Enjoy warm or room temperature.',
    heatingInstructions: 'Toast bread lightly if desired. Microwave eggs on 50% power for 20 seconds.',
    badge: 'Avocado Toast'
  },
  {
    id: 'bf-02',
    name: 'Garden Herb, Spinach & Goat Cheese Omelet',
    subtitle: 'Three pasture-raised eggs, blistered heirloom tomatoes, microgreens & seeded rye',
    description: 'French-folded organic three-egg omelet filled with sautéed baby spinach, caramelized heirloom cherry tomatoes, and creamy aged French chèvre, finished with chopped chives and bright microgreens.',
    category: 'breakfast',
    subcategory: 'Omelets',
    price: 17.00,
    image: BREAKFAST_OMELET,
    nutritionVerified: true,
    macros: {
      calories: 430,
      protein: 31,
      carbs: 14,
      fat: 26,
      fiber: 4,
      sodium: 420
    },
    tags: ['vegetarian', 'gluten-free', 'keto', 'high-protein'],
    ingredients: [
      'Pasture-Raised Organic Eggs',
      'Organic Baby Spinach',
      'Heirloom Cherry Tomatoes',
      'Aged French Goat Cheese',
      'Fresh Chives & Tarragon',
      'Pea Shoot Microgreens',
      'Extra Virgin Olive Oil'
    ],
    allergens: ['Egg', 'Milk'],
    addons: [
      { id: 'add-turkey-bacon', name: 'Crispy Uncured Turkey Bacon', price: 3.25, calories: 90 },
      { id: 'add-avocado', name: 'Sliced Hass Avocado', price: 2.50, calories: 120 },
      { id: 'add-feta', name: 'Extra Goat Cheese Crumble', price: 1.75, calories: 75 }
    ],
    chefNote: 'Folded gently in French butter-seasoned pans for a velvety, cloud-like center.',
    heatingInstructions: 'Warm gently in skillet for 2 minutes or microwave 50 seconds.',
    badge: 'Omelets'
  },
  {
    id: 'bf-03',
    name: 'Wild Blueberry Ricotta Protein Pancakes',
    subtitle: 'Golden rolled oat batter, pure Vermont maple syrup & whipped sweet mascarpone',
    description: 'Fluffy golden pancakes crafted with gluten-free rolled oat flour and whole-milk ricotta, folded with organic Maine blueberries and blackberries, served with pure Vermont grade-A amber maple syrup.',
    category: 'breakfast',
    subcategory: 'Pancakes',
    price: 15.50,
    image: BREAKFAST_PANCAKES,
    nutritionVerified: true,
    macros: {
      calories: 490,
      protein: 32,
      carbs: 56,
      fat: 14,
      fiber: 8,
      sodium: 380
    },
    tags: ['vegetarian', 'gluten-free', 'high-protein'],
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
    addons: [
      { id: 'add-almond-butter', name: 'Roasted Almond Butter Drizzle', price: 2.00, calories: 100 },
      { id: 'add-fresh-berries', name: 'Extra Organic Mixed Berries', price: 2.75, calories: 45 },
      { id: 'add-turkey-sausage', name: 'Herb Turkey Breakfast Links (2)', price: 3.50, calories: 130 }
    ],
    chefNote: '32g clean morning protein with natural sustained-release carbohydrates.',
    heatingInstructions: 'Microwave pancakes for 1 minute on high; warm maple syrup cup separately for 10 seconds.',
    badge: 'Pancakes'
  },
  {
    id: 'bf-04',
    name: 'Cast-Iron Shakshuka & Superfood Grain Bowl',
    subtitle: 'San Marzano tomatoes, roasted peppers, warm quinoa, Greek yogurt & fresh herbs',
    description: 'Slow-simmered organic San Marzano plum tomatoes and roasted bell peppers baked with farm eggs, served over tri-color quinoa with whipped Greek herb yogurt, cucumber ribbons, and toasted pumpkin seeds.',
    category: 'breakfast',
    subcategory: 'Fresh Bowls',
    price: 16.95,
    image: BREAKFAST_SHAKSHUKA,
    nutritionVerified: true,
    macros: {
      calories: 440,
      protein: 28,
      carbs: 34,
      fat: 20,
      fiber: 8,
      sodium: 440
    },
    tags: ['vegetarian', 'gluten-free', 'keto'],
    ingredients: [
      'San Marzano Organic Tomatoes',
      'Pasture-Raised Eggs',
      'Tricolor Organic Quinoa',
      'Strained Greek Yogurt',
      'Red & Yellow Bell Peppers',
      'Toasted Pepitas & Cilantro',
      'Extra Virgin Olive Oil'
    ],
    allergens: ['Egg', 'Milk'],
    addons: [
      { id: 'add-sheep-feta', name: 'Crumbled Greek Sheep Feta', price: 2.00, calories: 80 },
      { id: 'add-flatbread', name: 'Warm Gluten-Free Herb Flatbread', price: 2.50, calories: 150 },
      { id: 'add-avocado', name: 'Sliced Hass Avocado', price: 2.50, calories: 120 }
    ],
    chefNote: 'Bright morning nourishment balancing warm spices, lycopene, and probiotic yogurt.',
    heatingInstructions: 'Microwave 1 min 30 sec (keep chilled herb yogurt cup aside).',
    badge: 'Fresh Bowls'
  },

  // ================= LUNCH SECTION (Grain Bowls, Salads, Sandwiches, Grilled Meals) =================
  {
    id: 'lu-01',
    name: 'Wagyu Beef & Black Truffle Brioche Sandwich',
    subtitle: 'Aged Gruyère, caramelized balsamic onions, wild arugula & rosemary sweet potato frites',
    description: 'Quarter-pound 100% American Wagyu beef seared crispy with melted alpine Gruyère, balsamic-glazed shallots, baby wild arugula, and black winter truffle aioli on a toasted artisan brioche bun, paired with rosemary sweet potato fries.',
    category: 'lunch',
    subcategory: 'Sandwiches',
    price: 21.00,
    image: LUNCH_WAGYU_BURGER,
    nutritionVerified: true,
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
      'American Wagyu Beef Patty',
      'Aged Swiss Gruyère',
      'Caramelized Spanish Onions',
      'Wild Baby Arugula',
      'French Black Winter Truffle Aioli',
      'Artisan Brioche Bun',
      'Garnet Sweet Potato Wedges',
      'Fresh Rosemary & Sea Salt'
    ],
    allergens: ['Wheat', 'Milk', 'Egg'],
    addons: [
      { id: 'add-avocado', name: 'Sliced Hass Avocado', price: 2.50, calories: 120 },
      { id: 'add-fried-egg', name: 'Pasture-Raised Egg', price: 2.00, calories: 70 },
      { id: 'add-gf-bun', name: 'Gluten-Free Brioche Bun Swap', price: 1.50, calories: 20 }
    ],
    chefNote: 'Ground fresh daily from prime chuck and brisket cuts.',
    heatingInstructions: 'Toast bun in toaster or oven. Warm patty and fries at 375°F for 4 mins.',
    badge: 'Sandwiches'
  },
  {
    id: 'lu-02',
    name: 'Gourmet Teriyaki Salmon Wellness Grain Bowl',
    subtitle: 'Hass avocado, organic edamame, pickled pink ginger & toasted sesame jasmine rice',
    description: 'Char-glazed wild sockeye salmon fillet served over fluffy jasmine rice with sliced Hass avocado, organic steamed edamame, crisp pickled pink ginger, and a light gluten-free tamari sesame drizzle.',
    category: 'lunch',
    subcategory: 'Grain Bowls',
    price: 19.50,
    image: SALMON_BOWL_IMAGE,
    nutritionVerified: true,
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
    addons: [
      { id: 'add-extra-salmon', name: 'Extra Wild Salmon (3 oz)', price: 6.50, calories: 165 },
      { id: 'add-seaweed-salad', name: 'Sesame Wakame Seaweed', price: 2.25, calories: 45 },
      { id: 'add-spicy-mayo', name: 'Yuzu Chili Tamari Drizzle', price: 1.00, calories: 60 }
    ],
    chefNote: 'Enjoy hot or chilled as a refreshing lunchtime grain bowl.',
    heatingInstructions: 'Microwave 1 min 30 sec (set fresh avocado cup aside first).',
    badge: 'Grain Bowls'
  },
  {
    id: 'lu-03',
    name: 'Char-Grilled Lemon Herb Chicken Breast',
    subtitle: 'Haricots verts, glazed heirloom carrots & roasted ancient grain pilaf',
    description: 'Organic free-range chicken breast grilled over white oak after a 3-hour sous-vide lemon-thyme bath for unmatched tenderness, accompanied by French green beans, heirloom baby carrots, and farro-millet pilaf.',
    category: 'lunch',
    subcategory: 'Grilled Meals',
    price: 18.50,
    image: CHICKEN_MEAL_IMAGE,
    nutritionVerified: true,
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
      'Ancient Grains Blend (Millet & Quinoa)',
      'Fresh Thyme & Rosemary',
      'Lemon Peel Infusion'
    ],
    allergens: [],
    addons: [
      { id: 'add-chimichurri', name: 'Garlic Herb Chimichurri', price: 1.50, calories: 85 },
      { id: 'add-extra-chicken', name: 'Extra Grilled Chicken (4 oz)', price: 5.00, calories: 140 },
      { id: 'add-broccolini', name: 'Charred Broccolini Side', price: 3.00, calories: 55 }
    ],
    chefNote: '52g ultra-clean lean protein with less than 400mg sodium and zero Top-9 allergens.',
    heatingInstructions: 'Microwave 2 minutes on high, let sit for 30 seconds before lifting lid.',
    badge: 'Grilled Meals'
  },
  {
    id: 'lu-04',
    name: 'Mediterranean Quinoa & Avocado Harvest Salad',
    subtitle: 'Roasted sweet potato, cucumber ribbons, watermelon radish & lemon herb dressing',
    description: 'Crisp farm-to-table salad bowl built with tri-color organic quinoa, maple-roasted sweet potato cubes, shaved English cucumber, watermelon radish, halved Hass avocado, toasted pepitas, and house Meyer lemon vinaigrette.',
    category: 'lunch',
    subcategory: 'Salads',
    price: 16.50,
    image: LUNCH_HARVEST_SALAD,
    nutritionVerified: true,
    macros: {
      calories: 430,
      protein: 18,
      carbs: 46,
      fat: 21,
      fiber: 13,
      sodium: 320
    },
    tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'plant-based'],
    ingredients: [
      'Tricolor Organic Quinoa',
      'Roasted Sweet Potato Cubes',
      'Hass Avocado',
      'English Cucumber & Watermelon Radish',
      'Cherry Tomatoes & Flat-Leaf Parsley',
      'Toasted Pumpkin Seeds (Pepitas)',
      'Meyer Lemon Herb Vinaigrette'
    ],
    allergens: [],
    addons: [
      { id: 'add-grilled-chicken', name: 'Add Grilled Herb Chicken (4 oz)', price: 5.00, calories: 140 },
      { id: 'add-crispy-tofu', name: 'Add Charred Organic Tofu (4 oz)', price: 3.50, calories: 110 },
      { id: 'add-wild-salmon', name: 'Add Wild King Salmon (4 oz)', price: 7.50, calories: 210 }
    ],
    chefNote: '100% Vegan and Top-9 Allergen Free with 13g of prebiotic plant fiber.',
    heatingInstructions: 'Ready to enjoy chilled. Drizzle Meyer lemon vinaigrette right before serving.',
    badge: 'Salads'
  },

  // ================= DINNER DINING SECTION (Chef Specials, Steaks, Premium Seafood, Chicken) =================
  {
    id: 'dn-01',
    name: '12-Hour Red Wine Braised Beef Short Rib',
    subtitle: 'Creamy parsnip mousseline, butter-glazed baby carrots & demi-glace reduction',
    description: 'Prime Angus beef short rib slow-braised for 12 hours in Napa Cabernet Sauvignon, bone broth, and aromatics until fork-tender, served over a velvety parsnip purée with glazed heirloom carrots and rich natural reduction.',
    category: 'dinner',
    subcategory: 'Chef Specials',
    price: 34.00,
    image: DINNER_SHORT_RIB,
    nutritionVerified: true,
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
    addons: [
      { id: 'add-truffle-butter', name: 'Black Truffle Compound Butter', price: 3.00, calories: 90 },
      { id: 'add-asparagus', name: 'Roasted Jumbo Asparagus', price: 3.50, calories: 45 },
      { id: 'add-demi-glace', name: 'Extra Cabernet Reduction Cup', price: 1.50, calories: 40 }
    ],
    chefNote: 'Our flagship dinner entrée. Braised low-and-slow for maximum richness.',
    heatingInstructions: 'Oven bake at 350°F for 8 minutes, or microwave for 2 mins 30 sec.',
    badge: 'Chef Specials'
  },
  {
    id: 'dn-02',
    name: 'Grilled Grass-Fed Filet Mignon & Chimichurri',
    subtitle: 'Charred broccolini, roasted sweet potato wedges & parsley-garlic herb drizzle',
    description: 'Tender cuts of 100% pasture-raised beef tenderloin seared over open flame, paired with caramelized sweet potato wedges, fire-kissed broccolini florets, and our house herbaceous parsley-garlic chimichurri.',
    category: 'dinner',
    subcategory: 'Steaks',
    price: 36.50,
    image: STEAK_MEAL_IMAGE,
    nutritionVerified: true,
    macros: {
      calories: 520,
      protein: 48,
      carbs: 34,
      fat: 20,
      fiber: 6,
      sodium: 480
    },
    tags: ['gluten-free', 'high-protein', 'paleo', 'dairy-free'],
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
    addons: [
      { id: 'add-wild-shrimp', name: 'Garlic Herb Wild Gulf Shrimp (4)', price: 7.00, calories: 110 },
      { id: 'add-mushrooms', name: 'Roasted Wild Cremini Mushrooms', price: 3.50, calories: 70 },
      { id: 'add-chimichurri', name: 'Extra House Chimichurri', price: 1.50, calories: 85 }
    ],
    chefNote: 'Chef Marcus recommends reheating at 350°F for 4 minutes for a medium-rare center.',
    heatingInstructions: 'Remove clear lid & sauce cup. Microwave on HIGH for 2 mins, or bake at 350°F for 7 mins.',
    badge: 'Steaks'
  },
  {
    id: 'dn-03',
    name: 'Pan-Seared Wild King Salmon & Lemon Dill',
    subtitle: 'Roasted asparagus, lemon dill herb reduction & tricolor Andean quinoa',
    description: 'Sustainably wild-caught Alaskan king salmon crisped to golden perfection, plated over fluffy tricolor quinoa infused with lemon zest, alongside tender jumbo asparagus spears and bright dill emulsion.',
    category: 'dinner',
    subcategory: 'Premium Seafood',
    price: 32.00,
    image: HERO_IMAGE,
    nutritionVerified: true,
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
    addons: [
      { id: 'add-scallops', name: 'Pan-Seared Diver Scallops (2)', price: 9.00, calories: 120 },
      { id: 'add-lemon-dill', name: 'Extra Lemon Dill Emulsion', price: 1.50, calories: 75 },
      { id: 'add-cauliflower-mash', name: 'Roasted Garlic Cauliflower Purée', price: 3.50, calories: 95 }
    ],
    chefNote: 'Rich in wild Omega-3 fatty acids and vitamin D.',
    heatingInstructions: 'Microwave 1 min 45 sec. Drizzle warmed lemon dill emulsion over salmon.',
    badge: 'Premium Seafood'
  },
  {
    id: 'dn-04',
    name: 'Tuscan Herb-Roasted Chicken & Heirloom Medley',
    subtitle: 'Pasture-raised chicken breast, blistered tomatoes, basil oil & broccolini',
    description: 'Pan-roasted organic chicken breast crusted with Tuscan rosemary, cracked pepper, and sun-dried tomato glaze, served alongside roasted broccolini, garlic-rubbed zucchini, and crisp green beans.',
    category: 'dinner',
    subcategory: 'Chicken',
    price: 26.50,
    image: CHICKEN_MEAL_IMAGE,
    nutritionVerified: true,
    macros: {
      calories: 460,
      protein: 49,
      carbs: 24,
      fat: 16,
      fiber: 6,
      sodium: 390
    },
    tags: ['gluten-free', 'dairy-free', 'high-protein', 'low-sodium'],
    ingredients: [
      'Organic Free-Range Chicken Breast',
      'Sun-Dried Italian Tomatoes',
      'Fresh Rosemary & Sweet Basil',
      'Organic Broccolini & Zucchini',
      'French Haricots Verts',
      'Cold-Pressed Olive Oil'
    ],
    allergens: [],
    addons: [
      { id: 'add-pesto', name: 'Dairy-Free Pine Nut Basil Pesto', price: 2.25, calories: 110 },
      { id: 'add-sweet-potato', name: 'Roasted Garnet Sweet Potato', price: 3.00, calories: 130 },
      { id: 'add-extra-chicken', name: 'Extra Tuscan Chicken (4 oz)', price: 5.00, calories: 140 }
    ],
    chefNote: 'Lean, protein-dense dinner crafted without dairy, gluten, or refined oils.',
    heatingInstructions: 'Microwave 2 mins on high or warm in oven at 350°F for 6 mins.',
    badge: 'Chicken'
  },

  // ================= SNACKS & BEVERAGES SECTION (Smoothies, Juices, Desserts, Light Bites) =================
  {
    id: 'sn-01',
    name: 'Emerald Matcha & Avocado Protein Smoothie',
    subtitle: 'Ceremonial Uji matcha, Hass avocado, baby spinach, chia seeds & coconut milk',
    description: 'Velvety cold-blended superfood smoothie crafted with ceremonial-grade Uji matcha, creamy avocado, organic spinach, plant-based vanilla protein, chia seeds, and unsweetened organic coconut milk.',
    category: 'snacks',
    subcategory: 'Smoothies',
    price: 10.50,
    image: SNACK_GREEN_SMOOTHIE,
    nutritionVerified: true,
    macros: {
      calories: 290,
      protein: 22,
      carbs: 18,
      fat: 14,
      fiber: 8,
      sodium: 140
    },
    tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'high-protein'],
    ingredients: [
      'Ceremonial Uji Matcha Green Tea',
      'Organic Hass Avocado',
      'Baby Spinach',
      'Organic Pea & Hemp Protein',
      'Black Chia Seeds & Hemp Hearts',
      'Unsweetened Coconut Milk',
      'Fresh Mint'
    ],
    allergens: [],
    addons: [
      { id: 'add-protein-scoop', name: 'Extra 20g Organic Plant Protein', price: 2.50, calories: 90 },
      { id: 'add-almond-butter', name: 'Raw Organic Almond Butter', price: 1.75, calories: 95 },
      { id: 'add-chia-hemp', name: 'Double Chia & Hemp Crunch', price: 1.25, calories: 60 }
    ],
    chefNote: 'Zero added cane sugar. Natural L-theanine calm focus with 22g clean protein.',
    heatingInstructions: 'Keep refrigerated at 35°F. Shake well before enjoying.',
    badge: 'Smoothies'
  },
  {
    id: 'sn-02',
    name: 'Cold-Pressed Citrus, Ginger & Turmeric Elixir',
    subtitle: 'Valencia orange, Peruvian ginger root, raw turmeric, Meyer lemon & black pepper',
    description: 'Hydraulic cold-pressed daily in small batches to lock in live enzymes and vitamin C—balancing sweet Valencia orange and Meyer lemon with warming ginger root, raw turmeric, and a pinch of piperine.',
    category: 'snacks',
    subcategory: 'Juices',
    price: 8.50,
    image: SNACK_GREEN_SMOOTHIE,
    nutritionVerified: true,
    macros: {
      calories: 110,
      protein: 2,
      carbs: 24,
      fat: 0,
      fiber: 1,
      sodium: 15
    },
    tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'low-sodium'],
    ingredients: [
      'Cold-Pressed Valencia Orange',
      'Organic Peruvian Ginger Root',
      'Fresh Raw Turmeric Root',
      'Meyer Lemon Juice',
      'Cracked Black Peppercorn',
      'Fresh Mint Leaf'
    ],
    allergens: [],
    addons: [
      { id: 'add-ginger-shot', name: 'Double Ginger Immunity Shot', price: 2.00, calories: 15 },
      { id: 'add-cayenne', name: 'Cayenne Metabolism Pinch', price: 0.50, calories: 0 },
      { id: 'add-honey', name: 'Raw Wildflower Honey Swirl', price: 1.00, calories: 45 }
    ],
    chefNote: 'Never pasteurized or HPP-treated—pressed fresh within 24 hours of dispatch.',
    heatingInstructions: 'Serve ice-cold straight from the glass bottle.',
    badge: 'Juices'
  },
  {
    id: 'sn-03',
    name: 'Dark Chocolate Avocado Silk Mousse Tart',
    subtitle: '72% Peruvian cacao, toasted walnut-date crust, organic raspberries & pistachios',
    description: 'Decadent yet clean patisserie dessert whipping 72% single-origin Peruvian dark chocolate with ripe avocado and Madagascar vanilla over a raw walnut-Medjool date crust, crowned with raspberries and pistachios.',
    category: 'snacks',
    subcategory: 'Desserts',
    price: 9.75,
    image: SNACK_CHOCOLATE_TART,
    nutritionVerified: true,
    macros: {
      calories: 310,
      protein: 6,
      carbs: 26,
      fat: 21,
      fiber: 7,
      sodium: 65
    },
    tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'plant-based'],
    ingredients: [
      '72% Single-Origin Peruvian Cacao',
      'Hass Avocado',
      'Medjool Dates & California Walnuts',
      'Organic Red Raspberries',
      'Roasted Pistachios & Cacao Nibs',
      'Madagascar Vanilla Bean'
    ],
    allergens: ['Tree Nuts'],
    addons: [
      { id: 'add-raspberries', name: 'Extra Organic Raspberries', price: 2.00, calories: 25 },
      { id: 'add-coconut-whip', name: 'Whipped Organic Coconut Cream', price: 1.50, calories: 65 },
      { id: 'add-espresso-nib', name: 'Cacao Nib & Pistachio Crunch', price: 1.25, calories: 55 }
    ],
    chefNote: 'Refined-sugar-free and dairy-free indulgence sweetened gently with Medjool dates.',
    heatingInstructions: 'Enjoy chilled directly from refrigerator.',
    badge: 'Desserts'
  },
  {
    id: 'sn-04',
    name: 'Artisan Chickpea Hummus & Seeded Crisp Box',
    subtitle: 'Roasted garlic lemon hummus, heirloom cherry tomatoes, cucumber & flax crisps',
    description: 'Wholesome midday snack box featuring house-whipped organic chickpea and sesame tahini hummus drizzled with Sicilian olive oil, served with crisp cucumber coins, cherry tomatoes, and gluten-free flaxseed crisps.',
    category: 'snacks',
    subcategory: 'Light Bites',
    price: 11.25,
    image: LUNCH_HARVEST_SALAD,
    nutritionVerified: true,
    macros: {
      calories: 280,
      protein: 11,
      carbs: 29,
      fat: 14,
      fiber: 8,
      sodium: 290
    },
    tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    ingredients: [
      'Organic Garbanzo Beans',
      'Roasted Sesame Tahini',
      'Golden Flax & Chia Seed Crisps',
      'Heirloom Cherry Tomatoes',
      'English Cucumber Ribbons',
      'Cold-Pressed Extra Virgin Olive Oil'
    ],
    allergens: ['Sesame'],
    addons: [
      { id: 'add-olives', name: 'Kalamata Olive Tapenade Cup', price: 1.75, calories: 70 },
      { id: 'add-feta-cup', name: 'Crumbled Greek Feta Side', price: 2.00, calories: 80 },
      { id: 'add-extra-crisps', name: 'Extra Seeded Flax Crisps', price: 1.75, calories: 90 }
    ],
    chefNote: 'Balanced fiber and slow-release plant energy ideal for afternoon focus.',
    heatingInstructions: 'Ready to eat chilled. No preparation required.',
    badge: 'Light Bites'
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
  { id: 'b-chicken', name: 'Grilled Free-Range Chicken', shortName: 'Chicken', calories: 220, protein: 40, carbs: 0, fat: 5, price: 8.50, allergen: '' },
  { id: 'b-salmon', name: 'Wild Alaskan King Salmon', shortName: 'Salmon', calories: 280, protein: 36, carbs: 0, fat: 14, price: 10.50, allergen: 'Fish' },
  { id: 'b-beef', name: 'Grass-Fed Seared Beef Steak', shortName: 'Beef', calories: 310, protein: 42, carbs: 0, fat: 15, price: 11.50, allergen: '' },
  { id: 'b-tofu', name: 'Crispy Organic Sprouted Tofu', shortName: 'Tofu', calories: 180, protein: 24, carbs: 4, fat: 8, price: 7.00, allergen: 'Soy' }
];

export const BUILDER_CARBS = [
  { id: 'c-brown-rice', name: 'Organic Steamed Brown Rice', shortName: 'Brown Rice', calories: 165, protein: 4, carbs: 34, fat: 1, price: 2.75, allergen: '' },
  { id: 'c-quinoa', name: 'Tricolor Andean Quinoa', shortName: 'Quinoa', calories: 140, protein: 5, carbs: 24, fat: 2, price: 3.50, allergen: '' },
  { id: 'c-greens', name: 'Mixed Organic Baby Greens', shortName: 'Greens', calories: 35, protein: 2, carbs: 5, fat: 0, price: 2.50, allergen: '' },
  { id: 'c-cauli', name: 'Cilantro Cauliflower Rice', shortName: 'Cauliflower Rice', calories: 45, protein: 2, carbs: 6, fat: 1, price: 3.75, allergen: '' }
];

export const BUILDER_VEGGIES = [
  { id: 'v-broccoli', name: 'Charred Garlic Broccoli', shortName: 'Broccoli', calories: 45, protein: 3, carbs: 6, fat: 1, price: 2.25, allergen: '' },
  { id: 'v-avocado', name: 'Sliced Hass Avocado', shortName: 'Avocado', calories: 120, protein: 2, carbs: 6, fat: 11, price: 3.00, allergen: '' },
  { id: 'v-spinach', name: 'Sautéed Baby Spinach', shortName: 'Spinach', calories: 35, protein: 3, carbs: 4, fat: 1, price: 2.25, allergen: '' },
  { id: 'v-asparagus', name: 'Roasted Jumbo Asparagus', shortName: 'Asparagus', calories: 40, protein: 3, carbs: 5, fat: 1, price: 2.75, allergen: '' }
];

export const BUILDER_SAUCES = [
  { id: 's-ranch', name: 'Herb Buttermilk Ranch', shortName: 'Ranch', calories: 90, protein: 1, carbs: 2, fat: 9, price: 1.25, allergen: 'Dairy' },
  { id: 's-lemon', name: 'Cold-Pressed Lemon Herb Vinaigrette', shortName: 'Lemon', calories: 60, protein: 0, carbs: 2, fat: 6, price: 1.00, allergen: '' },
  { id: 's-garlic', name: 'Roasted Garlic Olive Emulsion', shortName: 'Garlic', calories: 75, protein: 1, carbs: 2, fat: 7, price: 1.25, allergen: '' },
  { id: 's-chimichurri', name: 'Artisan Parsley Chimichurri', shortName: 'Chimichurri', calories: 70, protein: 1, carbs: 1, fat: 7, price: 1.50, allergen: '' }
];

export const BUILDER_PORTIONS = [
  { id: 'regular' as const, name: 'Regular', multiplier: 1, extraPrice: 0, desc: 'Balanced standard chef bowl' },
  { id: 'large' as const, name: 'Large', multiplier: 1.35, extraPrice: 3.50, desc: '+35% larger protein & base' },
  { id: 'extra' as const, name: 'Extra', multiplier: 1.75, extraPrice: 6.50, desc: '+75% double-hearty chef portion' }
];

export const BUILDER_EXTRAS = [
  { id: 'ex-protein', name: 'Extra Protein (+4 oz)', calories: 130, protein: 22, carbs: 0, fat: 4, price: 4.50, allergen: '' },
  { id: 'ex-cheese', name: 'Aged Feta & Parmigiano Cheese', calories: 95, protein: 6, carbs: 1, fat: 8, price: 2.25, allergen: 'Dairy' },
  { id: 'ex-nuts', name: 'Toasted Almonds & Walnuts', calories: 110, protein: 4, carbs: 3, fat: 10, price: 2.00, allergen: 'Tree Nuts' }
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

