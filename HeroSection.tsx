import React from 'react';
import { Search, Sparkles, Filter, Dumbbell, Flame, Utensils, HeartHandshake, Leaf, HeartPulse, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGoal: string;
  setSelectedGoal: (goal: string) => void;
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
  onOpenWizard: () => void;
  onOpenChat: () => void;
  chefsCount: number;
}

const GOALS = [
  { id: 'all', label: 'All Specialties', icon: Utensils },
  { id: 'Muscle Gain', label: 'Muscle Gain & High Protein', icon: Dumbbell },
  { id: 'Weight Loss', label: 'Weight Loss & Detox', icon: Flame },
  { id: 'Traditional Comfort', label: 'Traditional Homestyle Thalis', icon: HeartHandshake },
  { id: 'Keto / Low Carb', label: 'Keto & Ultra Low-Carb', icon: HeartPulse },
  { id: 'Hypertension Care', label: 'Ayurvedic & Low Sodium', icon: HeartPulse },
  { id: 'Vegan Athletic', label: 'Plant-Fuel Athletic', icon: Leaf },
];

const DIETS = [
  { id: 'all', label: 'All Diets' },
  { id: 'veg', label: 'Vegetarian' },
  { id: 'non-veg', label: 'Non-Vegetarian' },
  { id: 'vegan', label: '100% Vegan' },
  { id: 'keto', label: 'Keto' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedGoal,
  setSelectedGoal,
  selectedDiet,
  setSelectedDiet,
  onOpenWizard,
  onOpenChat,
  chefsCount,
}) => {
  return (
    <section className="bg-gradient-to-b from-emerald-50/60 via-slate-50/40 to-slate-100/50 pt-8 pb-10 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top announcement badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Team Project: Smart Kitchen & AI Recommendation Engine</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Home Cooked
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Macros
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Clean Cold-Pressed Oils
            </span>
          </div>
        </div>

        {/* Hero Headline & Intro */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Home-Cooked Food,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Biologically Matched
            </span>{' '}
            to Your Health Goals.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Skip processed meal kits and oily restaurant takeaways. NutriHome connects you with vetted neighborhood home chefs preparing freshly weighed, high-nutrition meals aligned with your metabolism.
          </p>
        </div>

        {/* Search & AI Recommendation banner */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chefs, dishes, high-protein chicken, quinoa, keto, thalis..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChat}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask NutriGuide AI</span>
            </button>
            <button
              onClick={onOpenWizard}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition"
              title="Compute exact daily calories"
            >
              <span>Calculate Macros</span>
            </button>
          </div>
        </div>

        {/* Goal Categories Filter Row */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filter by Goal / Specialty ({chefsCount} {chefsCount === 1 ? 'Chef' : 'Chefs'} Found)
            </span>
            {selectedGoal !== 'all' && (
              <button
                onClick={() => setSelectedGoal('all')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Reset goal filter
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {GOALS.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-2xs ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{goal.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary Preferences Row */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 mr-1 whitespace-nowrap">Diet:</span>
          {DIETS.map((diet) => {
            const isSelected = selectedDiet === diet.id;
            return (
              <button
                key={diet.id}
                onClick={() => setSelectedDiet(diet.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {diet.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
