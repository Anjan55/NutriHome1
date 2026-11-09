export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  diet: 'veg' | 'non-veg' | 'vegan';
  isSignature?: boolean;
}

export interface Chef {
  id: string;
  name: string;
  specialty: string;
  chefName: string;
  experience: string;
  hygieneScore: number;
  rating: number;
  reviewsCount: number;
  distance: string;
  pricePerMeal: number;
  weeklyPlanPrice: number;
  deliveryTime: string;
  coverImage: string;
  avatarImage: string;
  tags: string[];
  dietaryCategory: 'all' | 'veg' | 'non-veg' | 'vegan' | 'keto';
  goalCategories: string[];
  avgMacros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  bio: string;
  fssaiNumber: string;
  dishes: Dish[];
}

export const HOME_CHEFS: Chef[] = [
  {
    id: 'fitbites',
    name: "FitBites by Anjali",
    specialty: "Protein-Packed Meals & Muscle Recovery",
    chefName: "Chef Anjali Verma",
    experience: "8 yrs culinary & sports nutrition",
    hygieneScore: 99,
    rating: 4.9,
    reviewsCount: 184,
    distance: "1.8 miles away",
    pricePerMeal: 13.5,
    weeklyPlanPrice: 75,
    deliveryTime: "30-45 mins",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    tags: ["High Protein", "Muscle Recovery", "Lean Meats", "Macro-Balanced"],
    dietaryCategory: "non-veg",
    goalCategories: ["Muscle Gain", "Athletic Performance", "Post-Workout Recovery", "High Protein"],
    avgMacros: {
      calories: 470,
      protein: 48,
      carbs: 38,
      fat: 14
    },
    bio: "Engineered specifically for active fitness enthusiasts, gym-goers, and athletes. Each portion is weighed to the gram, packed with hormone-free lean proteins, roasted sweet potatoes, and organic greens cooked in minimal cold-pressed olive oil.",
    fssaiNumber: "FSSAI-2142301100298",
    dishes: [
      {
        id: "fb-1",
        name: "Herb-Grilled Chicken & Warm Quinoa Pilaf",
        description: "Marinated tender chicken breast over fluffy tri-color quinoa, roasted asparagus, and light citrus herb dressing.",
        price: 13.5,
        calories: 440,
        protein: 46,
        carbs: 36,
        fat: 11,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
        diet: "non-veg",
        isSignature: true
      },
      {
        id: "fb-2",
        name: "Tandoori Paneer Macro Power Bowl",
        description: "Low-fat cottage cheese cubes tossed in stone-ground spices with brown rice, edamame, and cucumber mint raita.",
        price: 12.5,
        calories: 460,
        protein: 34,
        carbs: 42,
        fat: 16,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        diet: "veg"
      },
      {
        id: "fb-3",
        name: "Smoked Turkey & Egg White Scramble Box",
        description: "Fluffy egg whites, lean smoked turkey bits, sautéed spinach, and baked sweet potato wedges.",
        price: 12.0,
        calories: 390,
        protein: 42,
        carbs: 26,
        fat: 10,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
        diet: "non-veg"
      }
    ]
  },
  {
    id: 'green-glow',
    name: "Green Glow Bowls",
    specialty: "Detox Salads & Gut Health",
    chefName: "Chef Maya Lin",
    experience: "6 yrs plant-based gastronomy",
    hygieneScore: 100,
    rating: 4.85,
    reviewsCount: 142,
    distance: "2.4 miles away",
    pricePerMeal: 12.0,
    weeklyPlanPrice: 65,
    deliveryTime: "25-40 mins",
    coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    avatarImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    tags: ["Low Calorie", "Vegan", "Weight Loss", "Gut Health", "Gluten-Free"],
    dietaryCategory: "vegan",
    goalCategories: ["Weight Loss", "Detox & Cleanse", "Gut Health", "Vegan", "Low Calorie"],
    avgMacros: {
      calories: 340,
      protein: 18,
      carbs: 42,
      fat: 12
    },
    bio: "Wholesome, alkalizing raw and warm superfood bowls created to reboot digestion, melt stubborn fat, and eliminate midday energy crashes. Featuring fermented kimchi, sprouted seeds, and raw apple cider vinaigrettes.",
    fssaiNumber: "FSSAI-2142200981123",
    dishes: [
      {
        id: "gg-1",
        name: "Avocado Green Goddess Crunch Bowl",
        description: "Hass avocado, baby kale, shaved cucumbers, pumpkin seeds, microgreens, and probiotic cashew herb dressing.",
        price: 12.0,
        calories: 340,
        protein: 16,
        carbs: 38,
        fat: 14,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        diet: "vegan",
        isSignature: true
      },
      {
        id: "gg-2",
        name: "Sprouted Mung & Roasted Beet Detox Box",
        description: "Slow-roasted Chioggia beets, live sprouted mung lentils, orange pomegranate jewels, and walnut balsamic drizzle.",
        price: 11.5,
        calories: 320,
        protein: 19,
        carbs: 45,
        fat: 8,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        diet: "vegan"
      },
      {
        id: "gg-3",
        name: "Warm Kimchi Cauliflower Rice Sauté",
        description: "Probiotic house-cured kimchi, riced cauliflower, edamame pods, and roasted sesame crunch.",
        price: 11.0,
        calories: 290,
        protein: 15,
        carbs: 32,
        fat: 9,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
        diet: "vegan"
      }
    ]
  },
  {
    id: 'aunty-comfort',
    name: "Aunty's Comfort Kitchen",
    specialty: "Home-style Thalis & Pure Soul Food",
    chefName: "Mrs. Radha Sharma",
    experience: "25+ yrs generational recipe keeper",
    hygieneScore: 98,
    rating: 4.95,
    reviewsCount: 310,
    distance: "0.9 miles away",
    pricePerMeal: 11.0,
    weeklyPlanPrice: 58,
    deliveryTime: "20-35 mins",
    coverImage: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    tags: ["High Carb", "Vegetarian", "Traditional", "Pure Ghee", "Comfort Food"],
    dietaryCategory: "veg",
    goalCategories: ["Traditional Comfort", "Endurance & Energy", "Vegetarian", "Family Meals"],
    avgMacros: {
      calories: 540,
      protein: 22,
      carbs: 78,
      fat: 16
    },
    bio: "Nothing heals like mama's kitchen. Radha aunty prepares fresh batches every morning: wood-pressed oil tadkas, hand-kneaded 100% whole grain rotis, protein-dense dal varieties, and comforting seasonal vegetables just like home.",
    fssaiNumber: "FSSAI-2142100455012",
    dishes: [
      {
        id: "ac-1",
        name: "Royal Heritage Vegetarian Thali",
        description: "Slow-simmered yellow moong dal, seasonal subzi, 3 fresh soft multigrain phulkas, jeera basmati, and cooling cucumber raita.",
        price: 11.5,
        calories: 560,
        protein: 24,
        carbs: 82,
        fat: 15,
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
        diet: "veg",
        isSignature: true
      },
      {
        id: "ac-2",
        name: "Panchmel Dal & Baingan Bharta Combo",
        description: "Five-lentil protein stew infused with smoky roasted eggplant mash and warm cumin rice.",
        price: 10.5,
        calories: 490,
        protein: 22,
        carbs: 74,
        fat: 12,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
        diet: "veg"
      },
      {
        id: "ac-3",
        name: "Desi Ghee Moong Dal Khichdi Bowl",
        description: "The ultimate restorative comfort pot: lightly spiced split yellow lentils and rice with roasted cumin and crushed black pepper.",
        price: 9.5,
        calories: 440,
        protein: 18,
        carbs: 68,
        fat: 11,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
        diet: "veg"
      }
    ]
  },
  {
    id: 'ketocraft',
    name: "KetoCraft Kitchen",
    specialty: "Ketogenic & Low-Carb Gourmet",
    chefName: "Chef David Ross",
    experience: "9 yrs keto culinary specialist",
    hygieneScore: 99,
    rating: 4.88,
    reviewsCount: 98,
    distance: "3.1 miles away",
    pricePerMeal: 14.5,
    weeklyPlanPrice: 82,
    deliveryTime: "35-50 mins",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    tags: ["Keto", "Low Carb", "Sugar-Free", "High Fat", "Metabolic Health"],
    dietaryCategory: "keto",
    goalCategories: ["Keto / Low Carb", "Fat Burning", "Sugar-Free", "High Fat"],
    avgMacros: {
      calories: 510,
      protein: 38,
      carbs: 6,
      fat: 36
    },
    bio: "Curated for sustained ketosis and mental clarity. Zero added sugars, under 7g net carbs per meal, using grass-fed butters, pasture-raised eggs, and rich MCT oils to fuel clean metabolic fat-burning.",
    fssaiNumber: "FSSAI-2142401887321",
    dishes: [
      {
        id: "kc-1",
        name: "Garlic Butter Steak & Cauliflower Mash",
        description: "Seared grass-fed beef medallions with garlic herb compound butter and silky roasted garlic cauliflower purée.",
        price: 14.5,
        calories: 520,
        protein: 44,
        carbs: 5,
        fat: 36,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
        diet: "non-veg",
        isSignature: true
      },
      {
        id: "kc-2",
        name: "Almond Flour Spinach & Ricotta Crustless Tart",
        description: "Baked organic eggs, creamy ricotta, baby spinach, and pine nuts in an almond crust.",
        price: 13.0,
        calories: 420,
        protein: 26,
        carbs: 4,
        fat: 33,
        image: "https://images.unsplash.com/photo-1514944298350-0e9803884ff3?auto=format&fit=crop&w=600&q=80",
        diet: "veg"
      },
      {
        id: "kc-3",
        name: "Zucchini Noodles with Creamy Walnut Pesto",
        description: "Spiralized fresh zucchini strands bathed in avocado walnut pesto, roasted pine nuts, and grilled chicken breast.",
        price: 13.5,
        calories: 430,
        protein: 36,
        carbs: 7,
        fat: 29,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
        diet: "non-veg"
      }
    ]
  },
  {
    id: 'ayurvedic-nani',
    name: "NutriNani Ayurvedic Table",
    specialty: "Anti-Inflammatory & Senior Nutrition",
    chefName: "Chef Meera Rao",
    experience: "14 yrs clinical Ayurvedic dietetics",
    hygieneScore: 100,
    rating: 4.92,
    reviewsCount: 167,
    distance: "1.4 miles away",
    pricePerMeal: 11.5,
    weeklyPlanPrice: 62,
    deliveryTime: "25-40 mins",
    coverImage: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=800&q=80",
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tags: ["Low Sodium", "Anti-Inflammatory", "Ayurvedic", "Senior Friendly", "Easy Digest"],
    dietaryCategory: "veg",
    goalCategories: ["Hypertension Care", "Joint Mobility", "Elderly Gentle", "Ayurvedic"],
    avgMacros: {
      calories: 410,
      protein: 20,
      carbs: 64,
      fat: 9
    },
    bio: "Formulated for anti-inflammatory wellness, heart protection, and easy stomach digestion. Crafted with healing herbs like lakadong turmeric, fennel, cumin, and low-sodium Himalayan pink salt.",
    fssaiNumber: "FSSAI-2142200543209",
    dishes: [
      {
        id: "ay-1",
        name: "Golden Turmeric Ash Gourd & Mung Stew",
        description: "Cooling ash gourd and green split mung simmered with fresh turmeric root, curry leaves, and unrefined coconut oil.",
        price: 11.5,
        calories: 360,
        protein: 18,
        carbs: 56,
        fat: 7,
        image: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=600&q=80",
        diet: "veg",
        isSignature: true
      },
      {
        id: "ay-2",
        name: "Moringa Steamed Dumplings with Flaxseed Chutney",
        description: "Soft steamed drumstick leaf cakes served with omega-3 rich roasted flaxseed and tomato chutney.",
        price: 10.5,
        calories: 340,
        protein: 16,
        carbs: 58,
        fat: 6,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
        diet: "vegan"
      },
      {
        id: "ay-3",
        name: "Low-Sodium Fenugreek Flatbread with Bottle Gourd",
        description: "Methi thepla made with whole grain flour and spiced bottle gourd curry for blood sugar stability.",
        price: 10.0,
        calories: 380,
        protein: 15,
        carbs: 64,
        fat: 8,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
        diet: "veg"
      }
    ]
  },
  {
    id: 'plant-fuel',
    name: "The Plant Fuel Co.",
    specialty: "High-Protein Athletic Plant Prep",
    chefName: "Chefs Samira & Tariq",
    experience: "7 yrs sports plant nutrition",
    hygieneScore: 99,
    rating: 4.87,
    reviewsCount: 119,
    distance: "2.8 miles away",
    pricePerMeal: 13.0,
    weeklyPlanPrice: 72,
    deliveryTime: "30-45 mins",
    coverImage: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    tags: ["High Protein", "100% Plant-Based", "Iron-Rich", "Gluten-Free", "Athletic Vegan"],
    dietaryCategory: "vegan",
    goalCategories: ["Vegan Athletic", "High Protein Vegan", "Muscle Gain", "Clean Plant Energy"],
    avgMacros: {
      calories: 470,
      protein: 36,
      carbs: 54,
      fat: 12
    },
    bio: "Proving plant-based athletes can hit massive protein targets without ultra-processed powders. Made from organic tempeh, hemp seeds, French green lentils, and edamame.",
    fssaiNumber: "FSSAI-2142300998811",
    dishes: [
      {
        id: "pf-1",
        name: "Smoky Tempeh BBQ Bowl with Roasted Sweet Potato",
        description: "Marinated high-protein tempeh strips, charred broccoli florets, cinnamon sweet potatoes, and tahini maple glaze.",
        price: 13.0,
        calories: 460,
        protein: 38,
        carbs: 52,
        fat: 11,
        image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80",
        diet: "vegan",
        isSignature: true
      },
      {
        id: "pf-2",
        name: "Black Lentil & Edamame Iron Power Medley",
        description: "Beluga lentils, steamed shelled edamame, baby spinach, roasted pepitas, and lemon za'atar dressing.",
        price: 12.0,
        calories: 430,
        protein: 34,
        carbs: 46,
        fat: 13,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        diet: "vegan"
      },
      {
        id: "pf-3",
        name: "Golden Moroccan Chickpea & Vegetable Tajine",
        description: "Chickpeas simmered with heirloom carrots, apricots, cumin, and coriander over fragrant turmeric millet.",
        price: 11.5,
        calories: 410,
        protein: 26,
        carbs: 62,
        fat: 8,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
        diet: "vegan"
      }
    ]
  }
];
