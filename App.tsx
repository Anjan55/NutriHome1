import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ChefCard } from './components/ChefCard.tsx';
import { ChefModal } from './components/ChefModal.tsx';
import { MacroWizardModal } from './components/MacroWizardModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { NutriGuideChat } from './components/NutriGuideChat.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { HOME_CHEFS } from './data/chefs.ts';
import { Chef, Dish, CartItem, UserProfile } from './types.ts';
import { ChefHat, ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [chefs, setChefs] = useState<Chef[]>(HOME_CHEFS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  // Modal and Drawer states
  const [activeChef, setActiveChef] = useState<Chef | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // User Nutrition Profile
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(() => {
    try {
      const saved = localStorage.getItem('nutrihome_user_profile');
      return saved ? JSON.parse(saved) : undefined;
    } catch {
      return undefined;
    }
  });

  // Cart items with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nutrihome_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // AI Chat triggers
  const [externalChatQuery, setExternalChatQuery] = useState<string>('');
  const [aiMatchedChefId, setAiMatchedChefId] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nutrihome_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Save profile to localStorage
  useEffect(() => {
    if (userProfile) {
      try {
        localStorage.setItem('nutrihome_user_profile', JSON.stringify(userProfile));
      } catch (e) {
        console.error(e);
      }
    }
  }, [userProfile]);

  // Fetch live chefs from server if available
  useEffect(() => {
    fetch('/api/chefs')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.chefs && data.chefs.length > 0) {
          setChefs(data.chefs);
        }
      })
      .catch(() => {
        // Fallback to imported dataset
      });
  }, []);

  // Filter chefs
  const filteredChefs = chefs.filter((chef) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = chef.name.toLowerCase().includes(q);
      const matchesSpecialty = chef.specialty.toLowerCase().includes(q);
      const matchesTags = chef.tags.some((t) => t.toLowerCase().includes(q));
      const matchesDishes = chef.dishes.some(
        (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
      if (!matchesName && !matchesSpecialty && !matchesTags && !matchesDishes) {
        return false;
      }
    }

    // Goal match
    if (selectedGoal !== 'all') {
      const matchesGoalCategory = chef.goalCategories.includes(selectedGoal);
      const matchesTag = chef.tags.some((t) => t.toLowerCase().includes(selectedGoal.toLowerCase()));
      if (!matchesGoalCategory && !matchesTag) {
        return false;
      }
    }

    // Diet match
    if (selectedDiet !== 'all') {
      if (selectedDiet === 'veg') {
        const hasVeg = chef.dietaryCategory === 'veg' || chef.dishes.some((d) => d.diet === 'veg');
        if (!hasVeg) return false;
      } else if (selectedDiet === 'non-veg') {
        const hasNonVeg = chef.dietaryCategory === 'non-veg' || chef.dishes.some((d) => d.diet === 'non-veg');
        if (!hasNonVeg) return false;
      } else if (selectedDiet === 'vegan') {
        const hasVegan = chef.dietaryCategory === 'vegan' || chef.dishes.some((d) => d.diet === 'vegan');
        if (!hasVegan) return false;
      } else if (selectedDiet === 'keto') {
        const hasKeto = chef.dietaryCategory === 'keto' || chef.tags.some((t) => t.toLowerCase().includes('keto'));
        if (!hasKeto) return false;
      }
    }

    return true;
  });

  // Cart operations
  const handleAddToCart = (dish: Dish, chef: Chef, planType: 'single' | 'weekly') => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.dish.id === dish.id && item.planType === planType
      );
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id && item.planType === planType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, chef, quantity: 1, planType }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Ask AI about a specific chef
  const handleAskAIAboutChef = (chef: Chef) => {
    setIsChatOpen(true);
    setExternalChatQuery(
      `Tell me how ${chef.name}'s menu and macro composition (${chef.avgMacros.protein}g protein, ${chef.avgMacros.calories} kcal) can support my body goals.`
    );
  };

  // Macro wizard profile application
  const handleApplyProfile = (profile: UserProfile, triggerAIConsult: boolean) => {
    setUserProfile(profile);
    if (profile.fitnessGoal === 'muscle_gain') {
      setSelectedGoal('Muscle Gain');
    } else if (profile.fitnessGoal === 'weight_loss') {
      setSelectedGoal('Weight Loss');
    } else if (profile.fitnessGoal === 'keto') {
      setSelectedGoal('Keto / Low Carb');
    } else if (profile.fitnessGoal === 'senior_health') {
      setSelectedGoal('Hypertension Care');
    }

    if (triggerAIConsult) {
      setIsChatOpen(true);
      const goalName = profile.fitnessGoal.replace('_', ' ');
      setExternalChatQuery(
        `I am ${profile.age} years old (${profile.gender}), weight ${profile.weightKg}kg, activity level: ${profile.activityLevel}. My primary goal is ${goalName} with a target of ${profile.targetCalories} daily calories and ${profile.targetProtein}g protein. Which home chef should I order from?`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        userGoal={userProfile?.fitnessGoal ? userProfile.fitnessGoal.replace('_', ' ') : undefined}
      />

      {/* Hero & Goal Filtering */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGoal={selectedGoal}
        setSelectedGoal={setSelectedGoal}
        selectedDiet={selectedDiet}
        setSelectedDiet={setSelectedDiet}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        chefsCount={filteredChefs.length}
      />

      {/* Main Chef Marketplace Section (User's Member 1 & 4 Grid) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Available Home Chefs & Kitchens
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fresh small-batch meals weighed to your macros, cooked in certified neighborhood homes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredChefs.length} of {chefs.length} kitchens
            </span>
            {(searchQuery || selectedGoal !== 'all' || selectedDiet !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGoal('all');
                  setSelectedDiet('all');
                }}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Chefs Grid */}
        {filteredChefs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No home chefs found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try broadening your search term or resetting your dietary/goal filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGoal('all');
                setSelectedDiet('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredChefs.map((chef) => (
              <ChefCard
                key={chef.id}
                chef={chef}
                onSelectChef={(c) => setActiveChef(c)}
                onAskAIAboutChef={handleAskAIAboutChef}
                isAiMatched={aiMatchedChefId === chef.id}
              />
            ))}
          </div>
        )}

        {/* Nutritional Quality Assurance Banner */}
        <div className="mt-14 bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Are You a Certified Home Chef or Nutrition Enthusiast?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                Join the NutriHome culinary collective. We provide kitchen hygiene audits, food-grade biodegradable packaging, and connect you with health-conscious diners in your neighborhood.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              alert("Thank you for your interest in NutriHome Chef Network! Kitchen partner onboarding is open in your area.");
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition whitespace-nowrap"
          >
            Apply as Home Chef
          </button>
        </div>
      </main>

      {/* How it Works / Trust Pillars */}
      <HowItWorks
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-white text-lg tracking-tight">
                  Nutri<span className="text-emerald-500">Home</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering home culinary artists to cook scientifically balanced, delicious food for health-driven individuals.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Specialty Kitchens
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>FitBites by Anjali (High Protein)</li>
                <li>Green Glow Bowls (Detox & Gut)</li>
                <li>Aunty's Comfort Kitchen (Thalis)</li>
                <li>KetoCraft Kitchen (Low Carb)</li>
                <li>NutriNani Ayurvedic Table</li>
                <li>The Plant Fuel Co. (Vegan)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                AI & Health Engine
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>Gemini 3.8 Flash Nutrition Match</li>
                <li>Mifflin-St Jeor TDEE Calculator</li>
                <li>Gram-Accurate Macro Portions</li>
                <li>FSSAI 100-Point Hygiene Verification</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Team Project Dashboard
              </h4>
              <p className="text-slate-400 leading-relaxed mb-2">
                Created with pride by Members 1, 2, 3, 4, and 5: Full-stack food marketplace with real-time Gemini AI recommendation.
              </p>
              <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                Active Team Build
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>&copy; {new Date().getFullYear()} NutriHome Technologies Inc. All rights reserved.</p>
            <p className="text-slate-500">
              Disclaimer: Nutritional targets are generated for lifestyle guidance and are not medical diagnoses.
            </p>
          </div>
        </div>
      </footer>

      {/* Chef Menu & Detail Modal */}
      <ChefModal
        chef={activeChef}
        onClose={() => setActiveChef(null)}
        onAddToCart={handleAddToCart}
        onAskAIAboutChef={handleAskAIAboutChef}
      />

      {/* Macro & Goal Calibration Wizard */}
      <MacroWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onApplyProfile={handleApplyProfile}
        initialProfile={userProfile}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        targetProtein={userProfile?.targetProtein}
      />

      {/* NutriGuide AI Chat Widget (User's Member 2 & 3 Interactive AI) */}
      <NutriGuideChat
        chefs={chefs}
        onSelectChef={(c) => {
          setActiveChef(c);
          setAiMatchedChefId(c.id);
        }}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        userProfile={userProfile}
        externalQuery={externalChatQuery}
        onClearExternalQuery={() => setExternalChatQuery('')}
      />
    </div>
  );
}
